import { normalizePosition } from "@entities/character/model/nomalizationPosition";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Position, WebSocketCallbacks } from "./types";
import { useRef } from "react";
import { Boundaries } from "@/shared/types/common";

// 웹 소켓 연결 캡슐화 (useWebSocket으로 호출해서 사용)
export const createWebSocketService = (baseUrl: string) => {
  // client 선언
  const client = useRef<Client | null>(null);

  // 웹 소켓 연결(userId를 넘기고 연결 상태에 따라 콜백함수 동작)
  const connect = (
    userId: number,
    callbacks: WebSocketCallbacks
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        const socket = new SockJS(`${baseUrl}/ws`);
        client.current = new Client({
          webSocketFactory: () => socket,
          debug: (str) => console.log(str),
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
        });

        client.current.onConnect = () => {
          console.log("웹 소켓 연결 성공");

          // 최초 연결 시 userId 전송
          client.current?.publish({
            destination: `/pub/connect/users/${userId}`,
          });

          // 연결 성공 후 상태에 따라 처리
          // 게임 정보 받아오기
          if (callbacks.onWaitingInfo) {
            client.current?.subscribe(
              `/sub/users/${userId}/info`,
              (message: IMessage) => {
                callbacks.onWaitingInfo!(JSON.parse(message.body));
                console.log("GameInfo: ", JSON.parse(message.body));
              }
            );
          }

          // 무빙 정보 받아오기
          if (callbacks.onMove) {
            client.current?.subscribe(`/sub/move`, (message: IMessage) => {
              callbacks.onMove!(JSON.parse(message.body));
              console.log("moveInfo: ", JSON.parse(message.body));
            });
          }

          // 퀴즈 정보 받아오기
          if (callbacks.onQuizInfo) {
            client.current?.subscribe(`/sub/quiz-info`, (message: IMessage) => {
              callbacks.onQuizInfo!(JSON.parse(message.body));
              console.log("quizInfo: ", JSON.parse(message.body));
            });
          }

          // 퀴즈 결과 받아오기
          if (callbacks.onQuizResult) {
            client.current?.subscribe(
              `/sub/quiz-result`,
              (message: IMessage) => {
                callbacks.onQuizResult!(JSON.parse(message.body));
                console.log("quizResult: ", JSON.parse(message.body));
              }
            );
          }

          // 게임 상태 받아오기
          if(callbacks.onGameState){
            client.current?.subscribe(
              `/sub/game-info`,
              (message: IMessage)=>{
                callbacks.onGameState!(JSON.parse(message.body));
                // console.log("gameState: ", JSON.parse(message.body));
              }
            )
          }
          resolve(true);
        };
        client.current.activate();
      } catch (error) {
        console.log("웹 소켓 연결 실패: ", error);
        reject(error);
      }
    });
  };

  // 연결 해제 메서드
  const disconnect = () => {
    if (client.current && client.current.connected) {
      client.current.deactivate();
      console.log("웹 소켓 연결 해제");
    }
  };

  // 유저 무빙 정보 보내는 메서드
  const sendMoveMessage = (
    userId: number,
    characterName: string,
    position: Position,
    boundaries: Boundaries
  ) => {
    if (!client.current || !client.current.connected) {
      console.log("웹 소켓이 연결되어 있지 않음");
      return;
    }
    // 위치 데이터 정규화
    const normalizedPosition = normalizePosition(position, boundaries);
    const payload = { id: userId, characterName, position: normalizedPosition };
    client.current.publish({
      destination: "/pub/move",
      body: JSON.stringify(payload),
    });
    // console.log("정규화 position: ", payload.position)
  };

  return { connect, disconnect, sendMoveMessage };
};
