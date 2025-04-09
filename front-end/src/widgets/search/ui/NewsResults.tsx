import { NewsItem } from "@/features/search";
import { useNavigate } from "react-router-dom";

interface NewsResultsProps {
  results: NewsItem[];
}

export function NewsResults({ results }: NewsResultsProps) {
  const navigate = useNavigate();
  const formatPublishedDate = (published: string): string => {
    const date = new Date(published);
    return date.toLocaleDateString();
  };

  const handleItemClick = (id: string) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="mb-6">
      <div className="space-y-4">
        {results.map((item) => (
          <div
            key={`${item.id}-${item.published}`}
            className="flex items-start mb-4 cursor-pointer hover:bg-gray-50 rounded-lg p-2 border border-gray-200"
            onClick={() => handleItemClick(item.id)}
          >
            {/* 뉴스 썸네일 */}
            <div className="flex-shrink-0 mr-4">
              <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-200">
                <img
                  src={item.img}
                  alt="뉴스 썸네일"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 뉴스 텍스트 콘텐츠 */}
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-1">{item.category}</div>
              <h3 className="font-medium text-lg leading-tight mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {item.article}
              </p>
              <div className="text-xs text-gray-400 mt-1">
                {formatPublishedDate(item.published)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}