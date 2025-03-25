// pages/chatbot/Chatbot.tsx
import React, { useState } from "react";

export default function ChatbotPage () {
  const [message, setMessage] = useState<string>(""); // 사용자가 입력하는 메시지
  const [messages, setMessages] = useState<any[]>([]); // 대화 내용 배열

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { type: "user", text: message },
        { type: "bot", text: "뉴키즈 챗봇에 오신 것을 환영합니다!" }, // 챗봇의 기본 응답
      ]);
      setMessage(""); // 메시지 입력란 초기화
    }
  };

  const handleCloseChat = () => {
    window.location.href = "/";  // 창 닫기 시 '/'로 리디렉션
  };

  return (
    <div className="chatbot-container w-full mx-auto mt-8 rounded-lg shadow-xl bg-white flex flex-col h-screen">
      {/* 챗봇 헤더 (X 버튼을 가운데 정렬) */}
      <div className="chatbot-header p-4 bg-white flex justify-center items-center rounded-t-lg relative">
        <span className="font-semibold text-xl">뉴키즈 챗봇</span>
        {/* X 버튼을 헤더 안에 위치시키기 위해 position: absolute 사용 */}
        <button 
          onClick={handleCloseChat} 
          className="absolute left-4 text-xl font-bold text-gray-500"
        >
          X
        </button>
      </div>

      {/* 회색 구분선 */}
      <hr className="w-full border-t border-gray-200" />

      {/* 날짜 */}
      <div className="date p-2 text-center text-sm text-gray-500">
        3. 16일
      </div>

      {/* 대화 내용 */}
      <div className="chatbot-messages p-4 flex-grow overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type === "user" ? "text-right" : "text-left"}`}>
            {msg.type === "bot" && (
              <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/kira.png" alt="character" className="w-14 h-16 mt-0 ml-2 mr-2 inline-block" />
            )}
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.type === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력창 및 전송 버튼 (피그마 스타일) */}
      <div className="chatbot-input p-4 flex items-center space-x-4 bg-white rounded-b-lg">
        <input
          type="text"
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-500 placeholder-gray-400"
          placeholder="메시지를 입력하세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="p-3 bg-blue-500 text-white rounded-full"
          onClick={handleSendMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12l-6 6m0 0l-6-6m6 6V6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
