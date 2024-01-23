import Image from "next/image";

export default function ProjectItem({ data }: any) {
  const title = data.properties.이름.title[0].plain_text;
  const cover = data.cover.file.url;
  const stiringifyData = JSON.stringify(data.properties);
  const parsedData = JSON.parse(stiringifyData);
  const skills = parsedData["Skill Set"].multi_select;
  const s_date_str = parsedData["진행 기간"].date.start;
  const e_date_str = parsedData["진행 기간"].date.end;
  const desc = parsedData["프로젝트 소개"].rich_text[0].plain_text;

  const periodCalculate = (start: string, end: string) => {
    const s_date_arr = start.split("-");
    const e_date_arr = end.split("-");

    var s_date = new Date(
      Number(s_date_arr[0]),
      Number(s_date_arr[1]),
      Number(s_date_arr[2])
    );
    var e_date = new Date(
      Number(e_date_arr[0]),
      Number(e_date_arr[1]),
      Number(e_date_arr[2])
    );

    const diffInMs = Math.abs(Number(e_date) - Number(s_date));
    const res = diffInMs / (1000 * 60 * 60 * 24);

    return res;
  };

  return (
    <div className="project-card">
      <Image
        className="rounded-t-xl"
        src={cover}
        alt="Cover Image"
        quality={100}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "20vh", objectFit: "cover" }} // optional
      />

      <div className="p-4 flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-4">
          작업기간 ({periodCalculate(s_date_str, e_date_str)}
          일)
          <br />
          {s_date_str} ~ {e_date_str}
        </p>
        <h3 className="mt-4 text-sm">{desc}</h3>
        <div className="flex itmes-start mt-2">
          {skills.map((skill: any) => {
            const classname =
              "px-2 py-1 mr-2 rounded-md bg-" +
              skill.color +
              "-200 dark:bg-" +
              skill.color +
              "-700 w-30 dark:text-black";
            return (
              <h1 className={classname} key={skill.id}>
                {skill.name}
              </h1>
            );
          })}
        </div>
      </div>
    </div>
  );
}
