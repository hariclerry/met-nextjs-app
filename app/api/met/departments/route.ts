import { NextResponse } from "next/server";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/departments";

export async function GET() {
    try {
        const response = await fetch(BASE_URL, { next: { revalidate: 300 } });
        if (!response.ok) throw new Error("Failed to fetch departments");

        const data = await response.json();
        return NextResponse.json({ departments: data.departments });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
