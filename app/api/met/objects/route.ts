
import { NextResponse } from "next/server";

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export async function GET(req: Request) {
   try { 
    const {searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') as string) || 1;
    const limit = parseInt(searchParams.get('limit') as string) || 10;
    const departmentId = searchParams.get("departmentId") || null;
    const offset = (page - 1) * limit;

      // Fetch all objects
      let url = `${BASE_URL}/objects`;
      if (departmentId) {
          url += `?departmentIds=${departmentId}`;
      }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const objectIDs = data.objectIDs || [];
    const paginatedObjectIDs = objectIDs.slice(offset, offset + limit);

    const objectPromises = paginatedObjectIDs.map(async (id: number) => {
      const response  = await fetch(`${BASE_URL}/objects/${id}`);
        return response.json();
    });
    const allObjects = await Promise.all(objectPromises);

    const objects = allObjects.map(obj => ({
      objectID: obj.objectID,
      title: obj.title,
      primaryImage: obj.primaryImage,
      primaryImageSmall: obj.primaryImageSmall,
      artist: obj.artistDisplayName,
      department: obj.department,
      objectName: obj.objectName,
    }))

    const totalItems = objectIDs.length;
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    const paginatedObjects = {
      objects,
      totalItems,
      totalPages,
      hasNextPage,
      hasPreviousPage
    }

    return NextResponse.json(paginatedObjects, {status: 200})

   } catch (error) {
      return NextResponse.json({
        error: (error as Error).message
      }, {status: 500})
   }
}