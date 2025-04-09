import { LuX } from 'react-icons/lu'; // LuX 아이콘 임포트
import { ReporterArticle } from '@/features/reporter/model/types'; // ReporterArticle 타입 임포트
import "@shared/styles/CustomScroll.css"

interface ArticleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: ReporterArticle | null;
}

const ArticleDetailModal = ({ isOpen, onClose, article }: ArticleDetailModalProps) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500/75 flex justify-center items-start z-50 pt-16"> {/* pt-16 여백 추가 */}
      <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl h-auto max-h-[80vh] overflow-y-auto scroll">
        <LuX size={30} className="cursor-pointer ml-auto flex mb-3" onClick={onClose} />
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-semibold">{article.title}</div>
        </div>
        <div className="text-sm text-gray-500 mb-2">
          <span>{article.date} | </span>
          <span>{article.repoter}</span>
        </div>
        {/* 기사 사진 */}
        <div className="bg-gray-200 w-full h-64 mb-4">
          <img src="" alt="article_image" className="w-full h-full object-cover" />
        </div>
        <div className="text-base mb-2">{article.description}</div>

        {/* 기사 내용 */}
        <div className="text-base">{article.title}</div>
      </div>
    </div>
  );
};

export default ArticleDetailModal;
