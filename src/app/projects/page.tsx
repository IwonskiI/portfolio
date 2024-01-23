import { DATABASE_ID, TOKEN } from "../../../config";
import { ProjectItem } from "../components";

async function getData() {
  const options: RequestInit = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ page_size: 100 }),
    next: { revalidate: 3600 },
  };

  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    options
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Projects() {
  const data = await getData();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 mx-24 mb-10">
      <h1 className="text-4xl font-bold md:text-6xl">
        총 프로젝트 :
        <span className="pl-4 text-blue-500">{data.results.length}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full m-6 pt-10">
        {data.results.map((Project: any) => (
          <ProjectItem key={Project.id} data={Project} />
        ))}
      </div>
    </div>
  );
}
