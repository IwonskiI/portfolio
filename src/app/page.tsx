import Link from 'next/link'

import { Animation } from '../components'

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto flex px-5 py-15 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            성장하는 FE 개발자
            <br className="hidden lg:inline-block" />
            한원석입니다.
          </h1>
          <p className="mb-8 leading-relaxed">
            - 안녕하세요 Front-End 주니어 개발자 한원석 입니다.
            <br />- “이전보다 최소한 한 가지는 더 발전하자” 는 신념을 가지고
            개발합니다.
            <br />- 사용자 경험을 최우선으로 생각하며 개발합니다.
            <br />- 실패를 두려워하지 않고 새로운 기술을 탐구하는 것을 즐깁니다.
            <br />- 동료와의 커뮤니케이션 능력을 중요하게 생각합니다.
            <br />- <strong>React.JS</strong>와 <strong>TypeScript</strong>에
            관심이 많습니다.
            <br />- <strong>Next.JS</strong>에 관심을 가지고 학습 중입니다.
          </p>
          <div className="flex justify-center">
            <Link
              href="/projects"
              className="inline-flex text-white dark:text-white bg-iconColor dark:bg-iconColorSel border-0 py-2 px-6 focus:outline-none hover:bg-iconColorSel hover:dark:bg-iconColor rounded text-lg"
            >
              프로젝트 보러가기
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Animation></Animation>
        </div>
      </div>
    </section>
  )
}
