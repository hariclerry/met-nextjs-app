import { NextResponse } from "next/server";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");
        const searchById = searchParams.get("searchById") === "true";
        // const departmentId = searchParams.get("departmentId") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const offset = (page - 1) * limit;

        if (!query) {
            return NextResponse.json({ error: "Missing search query" }, { status: 400 });
        }

        // If searching by Object ID, fetch a single object
        if (searchById) {
            if (isNaN(Number(query))) {
                return NextResponse.json({ error: "Invalid Object ID" }, { status: 400 });
            }

            // The search by Object ID endpoint is different. It doesn't return an array of objects but a single object
            // I am just assuming that we might want to add another query parameter to the URL with the object ID
            const objectRes = await fetch(`${BASE_URL}/objects/${query}`, { next: { revalidate: 300 } });
            if (!objectRes.ok) return NextResponse.json({ error: "Object not found" }, { status: 404 });
            const objectData = await objectRes.json();
            return NextResponse.json({
                objects: [objectData],
                totalItems: 1,
                totalPages: 1,
                hasNextPage: false,
                hasPreviousPage: false,
            });
        }

        // Construct search query
        // Search by title or other fields
        console.log('query---', query);
        let url = `${BASE_URL}/search?title=true&q=${encodeURIComponent(query)}`;
        // This is not needed for the current implementation
        // if (departmentId) url += `&departmentId=${departmentId}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        const objectIDs = data.objectIDs || [];
        const paginatedObjectIDs = objectIDs.slice(offset, offset + limit);

        const objectPromises = paginatedObjectIDs.map(async (id: number) => {
            const response = await fetch(`${BASE_URL}/objects/${id}`);
            if (!response.ok) return null;
            return response.json();
        });

        const allObjects = (await Promise.all(objectPromises)).filter(obj => obj !== null);

        const objects = allObjects.map(obj => ({
            objectID: obj.objectID,
            title: obj.title,
            primaryImage: obj.primaryImage,
            primaryImageSmall: obj.primaryImageSmall,
            artist: obj.artistDisplayName,
            department: obj.department,
            objectName: obj.objectName,
        }));

        const totalItems = objectIDs.length;
        const totalPages = Math.ceil(totalItems / limit);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;

        return NextResponse.json({
            objects,
            totalItems,
            totalPages,
            hasNextPage,
            hasPreviousPage,
        });

    } catch (error) {
        return NextResponse.json({
            error: (error as Error).message
        }, { status: 500 });
    }
}
