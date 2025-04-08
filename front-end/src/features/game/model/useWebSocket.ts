import { useState, useEffect, useCallback } from "react";
import { createWebSocketService } from "./WebSocketService";
import { QuizInfo, QuizResult, Position, Player, WaitingInfo, GameState, NewWaitingInfo } from "./types";
import { denormalizePosition } from "@entities/character/model/nomalizationPosition";
import { Boundaries } from "@/shared/types/common";

const API_URL = import.meta.env.VITE_API_URL;

export const useWebSocket = (userId?: number) => {
  const [connected, setConnected] = useState(false);
  const [waitingInfo, setWaitingInfo] = useState<NewWaitingInfo | null>(null);
  const [allPlayers, setAllPlayers] = useState<Record<number, Player>>({});
  const [currentQuiz, setCurrentQuiz] = useState<QuizInfo | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [boundaries, setBoundaries] = useState<Boundaries | null>(null);
  const [gameState, setGameState] = useState<GameState>({state: "WAITING"});
  
  const webSocketService = createWebSocketService(API_URL);

  const setMapBoundaries = useCallback((newBoundaries: Boundaries) => {
    setBoundaries(newBoundaries);
  }, []);

  useEffect(() => {
    if (!userId) return;
    
    webSocketService
      .connect(userId, {
        onWaitingInfo(info: WaitingInfo) {
          const newWaitingInfo: NewWaitingInfo = {
            state: info.state,
            timeLeft: info.timeLeft,
          }
          setWaitingInfo(newWaitingInfo);
          const playersMap = info.players.reduce(
            (acc, player) => ({ ...acc, [player.id]: player }), 
            {}
          );
          setAllPlayers(playersMap);
        },
        onMove(moveInfo: Player) {
            if (boundaries) {
                const denormalizedPosition = denormalizePosition(
                  moveInfo.position, 
                  boundaries
                );
                
                setAllPlayers((prev) => ({
                  ...prev,
                  [moveInfo.id]: {
                    ...moveInfo,
                    position: denormalizedPosition
                  },
                }));
              }
        },
        onQuizInfo(quizInfo: QuizInfo) {
          setCurrentQuiz(quizInfo);
        },
        onQuizResult(result: QuizResult) {
          setQuizResult(result);
        },
        onGameState(result: GameState) {
          setGameState(result);
        }
      })
      .then(() => setConnected(true))
      .catch((err) => console.error("Failed to connect:", err));

    return () => webSocketService.disconnect();
  }, [userId]);

  const sendMove = useCallback(
    (userId:number, characterName: string, position: Position) => {
      if (!userId || !boundaries) return;
      webSocketService.sendMoveMessage(userId, characterName, position, boundaries);
      // console.log("sendMove Position: ", position.x, ", ", position.y)
    },
    [userId, webSocketService]
  );

  return { connected, waitingInfo, allPlayers, currentQuiz, quizResult, gameState, sendMove, setMapBoundaries };
};
