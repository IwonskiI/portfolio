import { DATABASE_ID, TOKEN } from '@/../config'
import { Main } from '@/components'

async function getDatabase() {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ page_size: 100 }),
    cache: 'no-store',
    // next: { revalidate: 3600 },
  }

  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    options,
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Projects() {
  // project info
  const data = await getDatabase()

  return <Main databases={data.results} />
}
