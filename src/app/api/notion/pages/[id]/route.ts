import { NextResponse } from "next/server";
import { TOKEN } from "@/../config";

export async function GET(request: any, context: { params:any }) {
  const url = `https://api.notion.com/v1/blocks/${context.params.id}/children?page_size=100`
  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      Authorization: `Bearer ${TOKEN}`,
    },
    cache: 'no-store',
  }
  const res = await fetch(url,options)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()

  return NextResponse.json(data.results);
}