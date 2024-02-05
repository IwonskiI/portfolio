import Image from 'next/image'
import Link from 'next/link'
import { favicon } from '@/../public'
import { Toggle } from '.'

export default function Header() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <Image
            src={favicon}
            alt="LogoImg"
            className="w-10 h-10 text-white bg-green-500 rounded-full"
          />
          <span className="ml-3 text-xl">성장하는 FE 개발자 한원석입니다</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-gray-900">
            홈
          </Link>
          <Link href="/projects" className="mr-5 hover:text-gray-900">
            프로젝트
          </Link>
          {/* <a className="mr-5 hover:text-gray-900">Third Link</a>
            <a className="mr-5 hover:text-gray-900">Fourth Link</a> */}
        </nav>
        <Toggle />
      </div>
    </header>
  )
}
