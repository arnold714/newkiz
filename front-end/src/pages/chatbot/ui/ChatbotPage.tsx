import React, { useState } from "react";
import { LuSend, LuX } from "react-icons/lu";
import "@shared/styles/CustomScroll.css"

export default function ChatbotPage () {
  const [message, setMessage] = useState<string>(""); // 사용자가 입력하는 메시지
  const [messages, setMessages] = useState<any[]>([]); // 대화 내용 배열

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [
        ...prev,
        { type: "user", text: message },
        { type: "bot", text: "뉴키즈 챗봇에 오신 것을 환영합니다!" },
      ]);
      setMessage(""); // 메시지 입력란 초기화
    }
  };

  const handleCloseChat = () => {
    window.history.back();
  };

  // 엔터 키를 눌렀을 때 메시지 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // message가 비어있는지 여부
  const isMessageEmpty = !message.trim();

  return (
    <div className="chatbot-container w-full mx-auto rounded-lg shadow-xl bg-white flex flex-col h-screen">
      {/* 챗봇 헤더 (X 버튼을 가운데 정렬) */}
      <div className="chatbot-header p-4 bg-white flex justify-center items-center rounded-t-lg relative">
        <span className="font-semibold text-2xl">뉴키즈 챗봇</span>
        {/* X 버튼을 헤더 안에 위치시키기 위해 position: absolute 사용 */}
        <LuX
          onClick={handleCloseChat} 
          className="absolute left-4 text-2xl font-bold text-gray-500"
        />
      </div>

      {/* 회색 구분선 */}
      <hr className="w-full border-t border-gray-200" />

      {/* 날짜 */}
      <div className="date p-2 text-center text-sm text-gray-500">
        3. 16일
      </div>

      {/* 대화 내용 */}
      <div className="chatbot-messages p-4 flex-grow overflow-y-auto scroll">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type === "user" ? "text-right" : "text-left"}`}>
            {msg.type === "bot" && (
              <img 
                src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/kira.png"
                alt="character"
                className="w-14 h-16 mt-0 ml-2 mr-2 inline-block"
              />
            )}
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.type === "user" ? "bg-blue-500 text-white text-xl" : "bg-gray-200 text-black text-xl"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력창 (피그마 스타일) */}
      <div className="chatbot-input p-4 bg-white rounded-b-lg">
        {/* relative 컨테이너 */}
        <div className="relative w-full">
          <input
            type="text"
            className="w-full p-3 pr-12 rounded-lg border border-gray-300 text-gray-500 placeholder-gray-400 focus:outline-none"
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}  // 엔터 키를 감지
          />
          {/* 아이콘 버튼 (absolute) */}
          <button
            className={`
              absolute right-2 top-1/2 transform -translate-y-1/2
              ${isMessageEmpty ? "text-gray-500 hover:text-gray-600" : "text-blue-500 hover:text-blue-600"}
            `}
            onClick={handleSendMessage}
            disabled={isMessageEmpty} // 메시지가 비어있으면 클릭 불가
          >
            <LuSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
