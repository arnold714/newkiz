import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowUp, LuPen, LuCirclePlay, LuX, LuPlus } from "react-icons/lu";
import "@widgets/reporter/styles/FunctionButton.css";

const FunctionButton = ({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement> }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const navigate = useNavigate();
    const wrapperRef = useRef<HTMLDivElement>(null);
  
    const handleScrollTop = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      setIsOpen(false);
    };
  
    const handleNavigate = (path: string) => {
      navigate(path);
      setIsOpen(false);
    };
  
    // ✨ 버튼 위치 계산 (600px 안쪽 콘텐츠 기준)
    useEffect(() => {
      const updateOffset = () => {
        const width = Math.min(Math.max(window.innerWidth, 360), 600);
        setOffsetX((width / 2) - 16); // 콘텐츠 절반 - 오른쪽 여백
      };
  
      updateOffset();
      window.addEventListener("resize", updateOffset);
      return () => window.removeEventListener("resize", updateOffset);
    }, []);
  
    return (
      <div
        ref={wrapperRef}
        className="function-button-wrapper"
        style={{ transform: `translateX(${offsetX}px)` }}
      >
        {isOpen && (
          <>
            <button onClick={handleScrollTop} className="fab-item"><LuArrowUp size={24} /></button>
            <button onClick={() => handleNavigate("/reporter/create")} className="fab-item"><LuPen size={24} /></button>
            <button onClick={() => setIsOpen(false)} className="fab-item"><LuX size={24} /></button>
          </>
        )}
        {!isOpen && (
          <button onClick={() => setIsOpen(true)} className="fab-main">
            <LuPlus size={24} />
          </button>
        )}
      </div>
    );
  };
  
  export default FunctionButton;