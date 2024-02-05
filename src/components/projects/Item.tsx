import Image from 'next/image'
import { URL_OPTION, IMAGE_URL } from '@/../config'

export default function Item({ data }: any) {
  const { id } = data
  const title = data.properties.이름.title[0].plain_text
  const cover = data.cover.file.url
  const imgUrl =
    IMAGE_URL + encodeURIComponent(cover.split('?')[0]) + URL_OPTION + id
  const stiringifyData = JSON.stringify(data.properties)
  const parsedData = JSON.parse(stiringifyData)
  const skills = parsedData['Skill Set'].multi_select
  const sDateStr = parsedData['진행 기간'].date.start
  const eDateStr = parsedData['진행 기간'].date.end
  const desc = parsedData['프로젝트 소개'].rich_text[0].plain_text

  const periodCalculate = (start: string, end: string) => {
    const sDateArr = start.split('-')
    const eDateArr = end.split('-')

    const sDate = new Date(
      Number(sDateArr[0]),
      Number(sDateArr[1]),
      Number(sDateArr[2]),
    )
    const eDate = new Date(
      Number(eDateArr[0]),
      Number(eDateArr[1]),
      Number(eDateArr[2]),
    )

    const diffInMs = Math.abs(Number(eDate) - Number(sDate))
    const res = diffInMs / (1000 * 60 * 60 * 24)

    return res + 1
  }

  return (
    <div className="project-card">
      <Image
        className="rounded-t-xl"
        src={imgUrl}
        alt="Cover Image"
        quality={100}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: '20vh', objectFit: 'cover' }}
      />

      <div className="p-4 flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        {eDateStr ? (
          <p className="mt-4">
            작업기간 ({periodCalculate(sDateStr, eDateStr)}
            일)
            <br />
            {sDateStr} ~ {eDateStr}
          </p>
        ) : (
          <p className="mt-4">
            작업기간 : 진행중
            <br />
            {sDateStr} ~ ing
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
            const classname = `px-2 py-1 mr-2 rounded-md dark:bg-
              ${color}
              -400 bg-
              ${color}
              -300 w-30 dark:text-black`
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
