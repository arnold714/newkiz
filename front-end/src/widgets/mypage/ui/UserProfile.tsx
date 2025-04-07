import { useUserProfile } from "@/shared";
import "@shared/styles/CustomScroll.css";

export const UserProfile = () => {
  const profile = useUserProfile();
  const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL;
  
  if (!profile) {
    return <div>로딩중...</div>;
  }

    return (
        <div className="h-full w-full flex flex-row justify-center items-center gap-5">
      <div className="flex rounded-full border border-gray-400 bg-white w-[90px] h-[90px] relative overflow-hidden justify-center items-center">
        <img src={`${imgUrl}dinos/${profile.characterId}.png`} alt="user character" className="absolute h-[90px]" />
      </div>
      <div className="flex flex-col justify-evenly h-2/3">
        <div className="h-1/2 flex flex-col justify-end items-center">
          <p className="text-xl font-bold">{profile.nickname}</p>
        </div>
        <div className="h-1/2 flex justify-center">
          <p className="text-[#9e9e9e] font-semibold">{profile.school.name}</p>
        </div>
      </div>
    </div>
  );
};