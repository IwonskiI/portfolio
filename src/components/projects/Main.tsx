'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch } from '@/features/states/store'
import { Detail, Item } from '..'
import { PageT } from '@/features/Dto/NotionT'
import { resetProject, setProject } from '@/features/states/project-slice'

export interface ProjectProps {
  databases: PageT[]
}

export default function Main(props: ProjectProps) {
  let [modal, setModal] = useState(false)
  let [portal, setPortal] = useState<Element | null>(null)
  const dispatch = useAppDispatch()

  const onClickSetProject = async (Project: PageT) => {
    try {
      const page_res = await fetch(`/api/notion/pages/${Project.id}`)
      if (!page_res.ok) {
        throw new Error('Network response was not ok')
      }
      const page_detail = await page_res.json()
      dispatch(setProject({ project: Project, page: page_detail }))
      setModal(!modal)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    setPortal(document.getElementById('portal'))
    if (!modal) {
      dispatch(resetProject())
    }
  }, [modal])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 sm:mx-24 mb-10">
      <h1 className="text-4xl font-bold md:text-6xl">
        총 프로젝트 :
        <span className="pl-4 text-blue-500">{props.databases.length}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full m-6 pt-10">
        {props.databases.map((Project: PageT) => (
          <div
            key={Project.id}
            className="flex"
            onClick={() => {
              onClickSetProject(Project)
            }}
          >
            <Item key={Project.id} data={Project} />
          </div>
        ))}
      </div>
      {modal && portal
        ? createPortal(<Detail modalHandelr={() => setModal(!modal)} />, portal)
        : null}
    </div>
  )
}
