import { useEffect, useState } from 'react';
import { LuX } from 'react-icons/lu'; 
import { ReporterArticle } from '@/features/reporter';
import { fetchKidsNewsById } from '@widgets/reporter'; 
import "@shared/styles/CustomScroll.css"

interface ArticleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: ReporterArticle | null;
}

const ArticleDetailModal = ({ isOpen, onClose, article }: ArticleDetailModalProps) => {
  const [detailedArticle, setDetailedArticle] = useState<ReporterArticle | null>(null);
  const [, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    if (article && isOpen) {
      setLoading(true);
      const fetchArticleDetail = async () => {
        const result = await fetchKidsNewsById(article.id); 
        if (result.success) {
          setDetailedArticle(result.data);
        } else {
          setError(result.error);
        }
        setLoading(false);
      };
      fetchArticleDetail();
    }
  }, [article, isOpen]);

  if (!isOpen || !detailedArticle) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500/75 flex justify-center items-start z-50 pt-16">
      <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl h-auto max-h-[80vh] overflow-y-auto scroll">
        <LuX size={30} className="cursor-pointer ml-auto flex mb-3" onClick={onClose} />
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-semibold">{detailedArticle.title}</div>
        </div>
        <div className="text-sm text-gray-500 mb-2">
          <span>{detailedArticle.createdAt} | </span>
          <span>{detailedArticle.author}</span>
        </div>
        <div className="bg-gray-200 w-full h-64 mb-4">
          <img src={detailedArticle.imgUrl} alt="article_image" className="w-full h-full object-cover" />
        </div>
        <div className="text-base mb-2">{detailedArticle.content}</div>
      </div>
    </div>
  );
};

export default ArticleDetailModal;