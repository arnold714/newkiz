import { useState, useEffect, useCallback } from "react";
import { createWebSocketService } from "./WebSocketService";
import { GameInfo, MoveInfo, QuizInfo, QuizResult, Position, Player } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const useWebSocket = (userId?: number) => {
  const [connected, setConnected] = useState(false);
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<QuizInfo | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const webSocketService = createWebSocketService(API_BASE_URL);

  useEffect(() => {
    if (!userId) return;

    webSocketService
      .connect(userId, {
        onGameInfo(info) {
          setGameInfo(info);
          const playersMap = info.players.reduce((acc, player) => ({ ...acc, [player.id]: player }), {});
          setAllPlayers(playersMap);
        },
        onMove(moveInfo) {
          setAllPlayers((prev) => ({
            ...prev,
            [moveInfo.player.id]: moveInfo.player,
          }));
        },
        onQuizInfo(setCurrentQuiz),
        onQuizResult(setQuizResult),
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
    [userId]
  );

  return { connected, gameInfo, allPlayers, currentQuiz, quizResult, sendMove };
};
