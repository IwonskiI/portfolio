'use client'

import React, { useState } from 'react'
import usePreventScroll from '@/hooks/use-preventScroll'
import Backdrop from '../Backdrop'
import { useAppDispatch, useAppSelector } from '@/features/states/store'
import { projectDetails, setContent } from '@/features/states/project-slice'
import { BlockT, EmojiT } from '@/features/Dto/NotionT'
import { Blocks, Contents } from '@/features/Dto/ProjectT'
import { DetailBlocks } from '..'

interface ModalProps {
  modalHandelr: () => void
}

export default function Detail({ modalHandelr }: ModalProps) {
  const [fetching, setFetching] = useState(false)
  const project = useAppSelector(projectDetails)
  const dispatch = useAppDispatch()
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }
  usePreventScroll()
  const stiringifyData = JSON.stringify(project.project.properties)
  const parsedData = JSON.parse(stiringifyData)
  const title = parsedData['이름'].title[0].plain_text
  const desc = parsedData['프로젝트 소개'].rich_text[0].plain_text
  const team = parsedData['팀 구성'].rich_text[0].plain_text
  const sDateStr = parsedData['진행 기간'].date.start
  const eDateStr = parsedData['진행 기간'].date.end
  const period = () => {
    const sDateArr = sDateStr.split('-')
    const eDateArr = eDateStr.split('-')

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

  const blocks: Blocks[] = []
  let currentBlock: Blocks | null = null
  let currentBlockTemp: Blocks | null = null
  let currentContent: Contents | null = null
  let currentContentTemp: Contents | null = null
  async function processPage(page: BlockT) {
    if (page.heading_2) {
      if (currentContent !== null) {
        currentBlock!.contents.push(currentContent)
        currentContent = null
      }
      if (currentBlock !== null) {
        currentBlockTemp = currentBlock
        currentBlock = null
      }
      currentBlock = {
        title: page.heading_2.rich_text[0].plain_text,
        contents: [],
      }
    } else if (page.paragraph) {
      if (currentContent !== null) {
        currentContentTemp = currentContent
        currentContent = null
      }
      if (page.paragraph.rich_text.length !== 0) {
        currentContent = {
          main_content: page.paragraph.rich_text[0].plain_text,
        }
      }
    } else if (page.bookmark) {
      if (currentContent !== null) {
        currentContent.sub_content = page.bookmark.url
        currentContentTemp = currentContent
        currentContent = null
      }
    } else if (page.link_preview) {
      if (currentContent !== null) {
        currentContent.sub_content = page.link_preview.url
        currentContentTemp = currentContent
        currentContent = null
      }
    } else if (page.embed) {
      if (currentContent !== null) {
        currentContent.sub_content = page.embed.url
        currentContentTemp = currentContent
        currentContent = null
      }
    } else if (page.image) {
      currentContent = {
        main_content: `image?${page.id}`,
        sub_content: page.image.file.url,
      }
      currentBlock!.contents.push(currentContent)
      currentContent = null
    } else if (page.callout) {
      currentContent = {
        main_content: (page.callout.icon as EmojiT).emoji,
        sub_content: page.callout.rich_text[0].plain_text,
      }
      currentBlock!.contents.push(currentContent)
      currentContent = null
    } else if (page.file) {
      currentContent = {
        main_content: page.file.name ?? '',
        sub_content: `${page.file.file.url}?id=${page.id}`,
      }
      currentBlock!.contents.push(currentContent)
      currentContent = null
    } else if (page.bulleted_list_item) {
      let bulletedChildrenList: any = null
      const bulletedChildren: string[] = []
      if (currentContent !== null) {
        currentBlock!.contents.push(currentContent)
        currentContent = null
      }
      if (page.has_children) {
        try {
          const blockRes = await fetch(`/api/notion/pages/${page.id}`, {})
          if (!blockRes.ok) {
            throw new Error('Network response was not ok')
          }
          bulletedChildrenList = await blockRes.json()
          for (const children of bulletedChildrenList) {
            bulletedChildren.push(
              `⸰ ${children.bulleted_list_item.rich_text[0].plain_text}`,
            )
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error fetching data:', error)
        }
      }
      currentContent = {
        main_content: `• ${page.bulleted_list_item.rich_text[0].plain_text}`,
        sub_content: bulletedChildren,
      }
    } else if (page.column_list) {
      try {
        const columnRes = await fetch(`/api/notion/pages/${page.id}`, {})
        if (!columnRes.ok) {
          throw new Error('Network response was not ok')
        }
        const columnChildrenList = await columnRes.json()
        for (const children of columnChildrenList) {
          try {
            const columnChildrenRes = await fetch(
              `/api/notion/pages/${children.id}`,
            )
            if (!columnChildrenRes.ok) {
              throw new Error('Network response was not ok')
            }
            const columnChildren = await columnChildrenRes.json()
            if (columnChildren[0].image) {
              currentContent = {
                main_content: `image?${columnChildren[0].id}`,
                sub_content: columnChildren[0].image.file.url,
              }
              currentBlock!.contents.push(currentContent)
              currentContent = null
            } else if (columnChildren[0].file) {
              currentContent = {
                main_content: columnChildren[0].file.name ?? '',
                sub_content: `${columnChildren[0].file.file.url}
                  ?id=${columnChildren[0].id}`,
              }
              currentBlock!.contents.push(currentContent)
              currentContent = null
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error fetching data:', error)
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', error)
      }
    }
  }

  ;(async () => {
    for (const page of project.page) {
      await processPage(page).then(() => {
        if (currentContentTemp !== null) {
          currentBlock!.contents.push(currentContentTemp)
          currentContentTemp = null
        }
        if (currentBlockTemp !== null) {
          blocks.push(currentBlockTemp)
          currentBlockTemp = null
        }
      })
    }
  })()
    .then(() => {
      if (currentContent !== null) {
        currentBlock!.contents.push(currentContent)
        currentContent = null
      }
      if (currentBlock !== null) {
        blocks.push(currentBlock)
        currentBlock = null
      }
      dispatch(setContent(blocks))
    })
    .then(() => {
      setFetching(true)
    })

  return (
    <Backdrop modalHandelr={modalHandelr}>
      <div
        role="presentation"
        className="bg-white dark:bg-slate-800 m-auto p-8 w-3/4 h-4/5 justify-center overflow-y-scroll flex flex-col items-center"
        onClick={stopPropagation}
      >
        <div className="items-center w-full h-full">
          <h1 className="text-5xl font-bold my-10">{title}</h1>
          <hr className="border-4" />
          <div className="flex flex-row mt-10">
            <div className="w-60 pr-8 border-r-2">
              <h2 className="text-lg font-bold">
                <strong>프로젝트 설명</strong>
              </h2>
              <p className="text-sm">{desc}</p>
              <br />
              <h2 className="text-lg font-bold">
                <strong>팀 구성</strong>
              </h2>
              <p className="text-sm">{team}</p>
              <br />
              <h2 className="text-lg font-bold">
                <strong>프로젝트 기간</strong>
              </h2>
              {eDateStr ? (
                <p className="text-sm">
                  {sDateStr} ~ {eDateStr} ({period()}일)
                </p>
              ) : (
                <p className="text-sm">{sDateStr} ~ 진행중</p>
              )}
            </div>
            <div className="flex-1">
              {fetching ? <DetailBlocks /> : <div className="spinner" />}
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  )
}
