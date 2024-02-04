import Image from 'next/image'
import { URL_OPTION, IMAGE_URL } from '@/../config'

export default function Item({ data }: any) {
  const id = data.id
  const title = data.properties.이름.title[0].plain_text
  const cover = data.cover.file.url
  const img_url =
    IMAGE_URL + encodeURIComponent(cover.split('?')[0]) + URL_OPTION + id
  const stiringifyData = JSON.stringify(data.properties)
  const parsedData = JSON.parse(stiringifyData)
  const skills = parsedData['Skill Set'].multi_select
  const s_date_str = parsedData['진행 기간'].date.start
  const e_date_str = parsedData['진행 기간'].date.end
  const desc = parsedData['프로젝트 소개'].rich_text[0].plain_text

  const periodCalculate = (start: string, end: string) => {
    const s_date_arr = start.split('-')
    const e_date_arr = end.split('-')

    var s_date = new Date(
      Number(s_date_arr[0]),
      Number(s_date_arr[1]),
      Number(s_date_arr[2]),
    )
    var e_date = new Date(
      Number(e_date_arr[0]),
      Number(e_date_arr[1]),
      Number(e_date_arr[2]),
    )

    const diffInMs = Math.abs(Number(e_date) - Number(s_date))
    const res = diffInMs / (1000 * 60 * 60 * 24)

    return res + 1
  }

  return (
    <div className="project-card">
      <Image
        className="rounded-t-xl"
        src={img_url}
        alt="Cover Image"
        quality={100}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: '20vh', objectFit: 'cover' }}
      />

      <div className="p-4 flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        {e_date_str ? (
          <p className="mt-4">
            작업기간 ({periodCalculate(s_date_str, e_date_str)}
            일)
            <br />
            {s_date_str} ~ {e_date_str}
          </p>
        ) : (
          <p className="mt-4">
            작업기간 : 진행중
            <br />
            {s_date_str} ~ ing
          </p>
        )}
        <h3 className="mt-4 text-sm">{desc}</h3>
        <div className="flex flex-wrap items-start mt-2 gap-y-2">
          {skills.map((skill: any) => {
            const color =
              skill.color === 'default'
                ? 'stone'
                : skill.color === 'brown'
                  ? 'cyan'
                  : skill.color
            const classname =
              'px-2 py-1 mr-2 rounded-md dark:bg-' +
              color +
              '-400 bg-' +
              color +
              '-300 w-30 dark:text-black'
            return (
              <h1 className={classname} key={skill.id}>
                {skill.name}
              </h1>
            )
          })}
        </div>
      </div>
    </div>
  )
}
