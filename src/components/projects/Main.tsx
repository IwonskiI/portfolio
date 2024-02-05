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
  const [modal, setModal] = useState(false)
  const [portal, setPortal] = useState<Element | null>(null)
  const dispatch = useAppDispatch()
  const { databases } = props

  const onClickSetProject = async (Project: PageT) => {
    try {
      const pageRes = await fetch(`/api/notion/pages/${Project.id}`)
      if (!pageRes.ok) {
        throw new Error('Network response was not ok')
      }
      const pageDetail = await pageRes.json()
      dispatch(setProject({ project: Project, page: pageDetail }))
      setModal(!modal)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    setPortal(document.getElementById('portal'))
    if (!modal) {
      dispatch(resetProject())
    }
  }, [modal, dispatch])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 sm:mx-24 mb-10">
      <h1 className="text-4xl font-bold md:text-6xl">
        총 프로젝트 :
        <span className="pl-4 text-blue-500">{databases.length}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full m-6 pt-10">
        {databases.map((Project: PageT) => (
          <div
            role="presentation"
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
