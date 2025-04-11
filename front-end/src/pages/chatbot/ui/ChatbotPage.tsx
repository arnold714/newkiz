import { useEffect, useRef, useState } from "react";
import { LuSend, LuX } from "react-icons/lu";
import "@shared/styles/CustomScroll.css";
import { useParams, useNavigate } from "react-router-dom";
import { initializeChatHistory, sendChatMessage } from "@/pages/chatbot";
import { ChatMessage } from "@/features/chatbot";
import { useUserProfile } from "@/shared";

export default function ChatbotPage() {
  const { newsId } = useParams<{ newsId: string }>();
  const navigate = useNavigate();
  const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL
  const profile = useUserProfile();

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(true);

  // 스크롤을 위한 ref
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 페이지 로드시 뉴스 id에 해당하는 챗봇 기록을 불러옴
  useEffect(() => {
    if (!newsId) return;
    const fetchHistory = async () => {
      try {
        const response = await initializeChatHistory(newsId);
        if (response && response.chatHistory) {
          // 응답을 ChatMessage[] 배열로 변환합니다.
          const parsedMessages: ChatMessage[] = response.chatHistory.flatMap((item: any) => [
            { type: "user", text: item.user },
            { type: "assistant", text: item.assistant },
          ]);
          setMessages(parsedMessages);
        } else {
          console.error("채팅 기록 초기화 실패: 응답 데이터가 올바르지 않음", response);
        }
      } catch (error) {
        console.error("채팅 기록 초기화 오류:", error);
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchHistory();
  }, [newsId]);

  // 메시지 전송 후 자동 스크롤: messages가 변경될 때마다 하단으로 스크롤
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 메시지 전송 핸들러
  const handleSendMessage = async () => {
    if (!message.trim() || !newsId) return;

    // 임시로 사용자의 메시지 추가 (옵션)
    setMessages((prev) => [...prev, { type: "user", text: message }]);

    try {
      // 요청: { newsId, question }
      // 서버 응답: { sessionId, chatHistory: [ { user, assistant }, ... ] }
      const response = await sendChatMessage({ newsId, question: message });
      if (response.chatHistory) {
        const parsedMessages: ChatMessage[] = response.chatHistory.flatMap((item) => [
          { type: "user", text: item.user },
          { type: "assistant", text: item.assistant },
        ]);
        setMessages(parsedMessages);
      } else {
        console.error("챗봇 응답 실패: 응답 데이터에 chatHistory가 없습니다.", response);
      }
    } catch (error) {
      console.error("챗봇 요청 오류:", error);
    }
    setMessage("");
  };

  const handleCloseChat = () => {
    navigate(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 날짜를 "M.D (요일)" 형식으로 포맷하는 함수
  const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = dayNames[date.getDay()];
    return `${month}.${day} (${dayOfWeek})`;
  };

  const todayStr = formatDate(new Date());

  if (loadingHistory) {
    return <div>로딩중...</div>;
  }

  if (!profile) {
    return <div>프로필 로딩중...</div>;
  }

  return (
    <div className="chatbot-container w-full mx-auto rounded-lg shadow-xl bg-white flex flex-col h-screen">
      {/* 헤더 */}
      <div className="chatbot-header p-4 bg-white flex justify-center items-center rounded-t-lg relative">
        <span className="font-semibold text-2xl">뉴키즈 챗봇</span>
        <LuX onClick={handleCloseChat} className="absolute left-4 text-2xl font-bold text-gray-500" />
      </div>
      <hr className="w-full border-t border-gray-200" />
      <div className="p-2 text-center text-sm text-gray-500">
        {todayStr}
      </div>

      {/* 대화 내용 */}
      <div className="chatbot-messages p-4 flex-grow overflow-y-auto scroll space-y-4">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`message ${msg.type === "user" ? "text-right mb-4" : "text-left mb-4"}`}
          >
            <div className="flex items-end">
              {msg.type === "assistant" && (
                <img 
                  src={`${imgUrl}dinos/${profile.characterId}.png`}
                  alt="assistant"
                  className="w-14 h-16 mt-0 ml-2 mr-2 inline-block"
                />
              )}
              <div
                className={`inline-block p-3 rounded-lg my-1 ${
                  msg.type === "user" 
                    ? "bg-blue-500 text-white text-xl ml-auto" 
                    : "bg-gray-200 text-black text-xl"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 메시지 입력창 */}
      <div className="chatbot-input p-4 bg-white rounded-b-lg">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full p-3 pr-12 rounded-lg border border-gray-300 text-gray-500 placeholder-gray-400 focus:outline-none"
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
              !message.trim() ? "text-gray-500 hover:text-gray-600" : "text-blue-500 hover:text-blue-600"
            }`}
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <LuSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}