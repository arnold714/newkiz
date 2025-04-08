import { SubCategory } from '@/features/category';

interface Props {
  subCategories: SubCategory[];
  onSubClick: (subId: string) => void;
  getColorClass: (index: number) => string;
  getIconUrl?: (iconName?: string) => string;
  selectedSubId?: string;
  containerClassName?: string; 
  cardClassName?: string;
  renderOverlay?: (subId: string) => React.ReactNode;
}

export const SubCategoryGrid: React.FC<Props> = ({
  subCategories,
  onSubClick,
  getColorClass,
  getIconUrl,
  containerClassName = "",
  cardClassName = "",
  renderOverlay
}) => {
  return (
    <div className={containerClassName}>
      {subCategories.map((subCat, index) => {
        const colorClass = getColorClass(index);

        return (
          <div
            key={subCat.id}
            className="cursor-pointer"
            onClick={() => onSubClick(subCat.id)}
          >
            <div
              className={`rounded-lg overflow-hidden shadow-lg ${colorClass} flex flex-col ${cardClassName}`}
            >
              <div className="flex-grow flex items-center justify-center">
                {subCat.iconName && getIconUrl && (
                  <img
                    src={getIconUrl(subCat.iconName)}
                    alt={subCat.name}
                    className="w-3/5 h-3/5 object-contain"
                  />
                )}
              </div>
              <div className="px-1 pb-2 text-center text-white font-medium text-sm leading-tight h-12 flex items-center justify-center">
                <span className="line-clamp-2">{subCat.name}</span>

                {renderOverlay && renderOverlay(subCat.id)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
