import { HotTopic, ProgressGraph, RecommendedNews } from '@/widgets/main';
import "@shared/styles/CustomScroll.css"
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { fetchMyPage } from "@/pages/mypage";
import { useUserProfile } from '@/shared';

export default function MainPage() {
  const [, setCookie] = useCookies(["userProfile"]);
  const userProfile = useUserProfile();
  const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL;

  useEffect(() => {
    (async () => {
      try {
        // 마이페이지 API 호출
        const response = await fetchMyPage();
        if (response.success) {
          const { profile, interests } = response.data;

          // 쿠키에 저장할 데이터 구성
          const userProfileForCookie = {
            id: profile.id,
            userId: profile.userId,
            nickname: profile.nickname,
            school: profile.school,
            difficulty: profile.difficulty,
            characterId: profile.characterId,
            interests,
          };

          // 쿠키에 저장 (7일 유효)
          setCookie("userProfile", JSON.stringify(userProfileForCookie), {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7일
          });
        }
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    })();
  }, [setCookie]);

  const nickname = userProfile?.nickname || "닉네임";
  const characterId = userProfile?.characterId || "nico";
  const userProfileForNews = userProfile ? userProfile : { interests: [] };
  return (
      <div className="h-screen flex flex-col overflow-auto scroll pb-20">
        <div className='my-5 flex justify-center min-gap-2 gap-[10vw]  items-center'>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-[#7CBA36] text-[20px] font-extrabold text-stroke-1 mb-0'>{nickname}</p>
            <img src={`${imgUrl}dinos/${characterId}.png`}
            alt={`character_${characterId}`} className='w-[60%] min-w-25 sm:w-35 mt-0'/>
          </div>
          <div className='flex justify-center'>
            <ProgressGraph />
          </div>
        </div>
        <div className='bg-white/60  p-2'>
          <div className="text-2xl font-bold text-center m-3">
            Today's TOP 10
          </div>
          <HotTopic />
        </div>
        <div className='mt-5'>
          <div className="text-2xl font-bold text-center m-3">
          {nickname} 님을 위한 추천 뉴스
          </div>
          <RecommendedNews userProfile={userProfileForNews}/>
        </div>
      </div>
  );
};
