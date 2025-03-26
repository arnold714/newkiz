import React from 'react'
import { LuChevronLeft } from "react-icons/lu";
import { UserProfile } from '@/widgets/mypage';

export default function MyPage() {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="w-[90%] h-16 flex flex-row justify-start items-center mx-auto">
        <LuChevronLeft className="text-[25px]" />
        <p className="text-2xl font-bold">마이페이지</p>
      </div>
      <div className="h-40 w-[90%] flex flex-row justify-center items-center mx-auto">
        <UserProfile />
      </div>
      <div className="w-full h-1 bg-gray-100"></div>
      <div className="w-[90%] mx-auto flex flex-col">
        <p>어떤 카테고리에 관심이 많을까요?</p>
      </div>
    </div>
  )
}
