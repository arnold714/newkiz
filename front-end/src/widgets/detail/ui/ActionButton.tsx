import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ActionButton.css"

const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL

interface ActionButtonProps {
  newsId: string;
}

export const ActionButton = ({ newsId }: ActionButtonProps) => {
  const [offsetX, setOffsetX] = useState(0);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);


  const handleNavigate = () => {
    navigate(`/chatbot/${newsId}`);
  };

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
        className="action-button-wrapper"
        style={{ transform: `translateX(${offsetX}px)` }}
      >
      <button onClick={handleNavigate} className="fab-item">
      <img src={`${imgUrl}dinos/nico.svg`} alt="character_nico" className="w-12"/>
      </button>
    </div>
  );
};