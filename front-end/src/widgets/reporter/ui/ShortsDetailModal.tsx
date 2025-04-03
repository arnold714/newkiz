import { FaRegHeart, FaRegComment } from "react-icons/fa6"; // 아이콘 임포트
import { LuX } from "react-icons/lu"; // LuX 아이콘 임포트
import { ShortsItem } from "@/widgets/reporter/ui/Shorts"; // ShortsItem 타입을 임포트
import "@shared/styles/CustomScroll.css"

interface ShortsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  shorts: ShortsItem | null;
}

const ShortsDetailModal = ({ isOpen, onClose, shorts }: ShortsDetailModalProps) => {
  if (!isOpen || !shorts) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500/75 flex justify-center items-center z-50 pt-16"> {/* 모달 상단 여백 추가 */}
      <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl h-auto max-h-[80vh] scroll overflow-y-auto relative">
        
        {/* 닫기 버튼: 영상 부분과 겹치지 않도록 우측 상단에 X 아이콘 배치 */}
        <div className="absolute top-4 right-4 cursor-pointer" onClick={onClose}>
          <LuX size={30} />
        </div>
        
        {/* 영상 부분: 영상의 크기를 고정 */}
        <div className="bg-gray-200 w-full h-[400px] mb-4 mt-7"> {/* 영상의 높이를 고정 */}
          <video controls className="w-full h-full object-cover">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* 기자 정보: 기자 캐릭터와 기자 이름은 위에, 기사 제목은 그 아래 */}
        <div className="flex mb-4">
          <img
            src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png" // 임시 기자 캐릭터 이미지
            alt="character_nico"
            className="w-12 h-12 mr-4 border-2 border-[#EFEFEF] rounded-full"
          />
          <div className="text-sm font-medium text-gray-600 relative flex items-center">
            {/* 기자 이름과 가로로 된 검정색 선 추가 */}
            <div className="mr-4 text-lg">zizon재형</div>
          </div>
        </div>
        
        {/* 기사 제목: 기자 정보 아래에 따로 표시 */}
        <div className="font-semibold text-lg mb-4">{shorts.title}</div>

        {/* 좋아요, 댓글 아이콘 */}
        <div className="flex justify-end gap-4 mt-4">
          <FaRegHeart size={25} className="cursor-pointer text-black" />
          <FaRegComment size={25} className="cursor-pointer text-black" />
        </div>
      </div>
    </div>
  );
};

export default ShortsDetailModal;
