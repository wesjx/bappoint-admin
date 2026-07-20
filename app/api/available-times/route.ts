import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  const companyId = request.nextUrl.searchParams.get("companyId");

  if (!date) {
    return NextResponse.json({ message: "date is required" }, { status: 400 });
  }

  if (!companyId) {
    return NextResponse.json({ message: "companyId is required" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_API_URL is not defined" },
      { status: 500 }
    );
  }

  const response = await fetch(
    `${baseUrl}/companies/${companyId}/appointments/available-times?date=${date}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
