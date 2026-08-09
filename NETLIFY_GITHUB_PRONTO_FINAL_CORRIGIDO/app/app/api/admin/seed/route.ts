import { NextResponse } from "next/server";

export async function POST() {
  // The catalog and demo admin are initialized automatically by the server.
  // Keeping a public seed endpoint would allow outsiders to probe/reset demo data.
  return NextResponse.json({ error: "Endpoint desativado." }, { status: 404 });
}
