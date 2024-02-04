import { Blocks } from '@/features/Dto/ProjectT'
import { projectContents } from '@/features/states/project-slice'
import { useAppSelector } from '@/features/states/store'
import Image from 'next/image'
import { URL_OPTION, IMAGE_URL, FILE_URL } from '@/../config'

export default function DetailBlocks() {
  const block = useAppSelector(projectContents)

  return block.map((block: Blocks, index) => (
    <div key={index} className="flex flex-col mb-5 ml-12 mr-4">
      <h2 className="text-3xl font-bold mb-2">{block.title}</h2>
      {block.contents.map((content, index) => (
        <div key={index}>
          {content.main_content.split('?')[0] !== 'image' && (
            <>
              {Array.isArray(content.sub_content) ? (
                <>
                  <h4 className="text-base">{content.main_content}</h4>
                  {content.sub_content.map((sub_content, index) => (
                    <p key={index} className="text-sm">
                      &nbsp;&nbsp;&nbsp;{sub_content}
                    </p>
                  ))}
                </>
              ) : (
                <>
                  {(content.sub_content as string).startsWith('http') ? (
                    <h4 className="text-lg leading-10">
                      &nbsp;&nbsp;&nbsp;•&nbsp;
                      <a
                        href={
                          (content.sub_content as string).startsWith(
                            'https://prod-files-secure',
                          )
                            ? FILE_URL +
                              encodeURIComponent(
                                (content.sub_content as string).split('?')[0],
                              ) +
                              URL_OPTION +
                              (content.sub_content as string).split('?id=')[1]
                            : (content.sub_content as string)
                        }
                        target="_blank"
                      >
                        <span className="underline">
                          {content.main_content}
                        </span>
                      </a>
                    </h4>
                  ) : (
                    <>
                      <h4 className="text-base">{content.main_content}</h4>
                      <p className="text-sm">{content.sub_content}</p>
                    </>
                  )}
                </>
              )}
            </>
          )}
          {content.main_content.split('?')[0] === 'image' && (
            <Image
              className="w-full h-full object-cover"
              src={
                IMAGE_URL +
                encodeURIComponent(
                  (content.sub_content as string).split('?')[0],
                ) +
                URL_OPTION +
                (content.main_content as string).split('?')[1]
              }
              alt="content"
              quality={100}
              width={0}
              height={0}
              sizes="80vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
      ))}
    </div>
  ))
}
