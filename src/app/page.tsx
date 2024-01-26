import Link from "next/link";
import { Animation } from "../components";

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
          <p className="mb-8 leading-relaxed">소개 글 작성하기.</p>
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
          <Animation />
        </div>
      </div>
    </section>
  );
}
