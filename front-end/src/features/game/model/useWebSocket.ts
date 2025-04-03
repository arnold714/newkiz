import { useState, useEffect, useCallback } from "react";
import { createWebSocketService } from "./WebSocketService";
import { GameInfo, QuizInfo, QuizResult, Position, Player } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export const useWebSocket = (userId?: number) => {
  const [connected, setConnected] = useState(false);
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [allPlayers, setAllPlayers] = useState<Record<number, Player>>({});
  const [currentQuiz, setCurrentQuiz] = useState<QuizInfo | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  
  const webSocketService = createWebSocketService(API_URL);

  useEffect(() => {
    if (!userId) return;
    
    webSocketService
      .connect(userId, {
        onGameInfo(info: GameInfo) {
          setGameInfo(info);
          const playersMap = info.players.reduce(
            (acc, player) => ({ ...acc, [player.id]: player }), 
            {}
          );
          setAllPlayers(playersMap);
        },
        onMove(moveInfo: Player) {
          setAllPlayers((prev) => ({
            ...prev,
            [moveInfo.id]: moveInfo,
          }));
        },
        onQuizInfo(quizInfo: QuizInfo) {
          setCurrentQuiz(quizInfo);
        },
        onQuizResult(result: QuizResult) {
          setQuizResult(result);
        },
      })
      .then(() => setConnected(true))
      .catch((err) => console.error("Failed to connect:", err));

    return () => webSocketService.disconnect();
  }, [userId]);

  const sendMove = useCallback(
    (characterName: string, position: Position) => {
      if (!userId) return;
      webSocketService.sendMoveMessage(userId, characterName, position);
    },
    [userId, webSocketService]
  );

  return { connected, gameInfo, allPlayers, currentQuiz, quizResult, sendMove };
};
