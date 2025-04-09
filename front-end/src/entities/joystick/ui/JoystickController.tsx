import { useAppSelector } from "@/app/redux/hooks"
import { useEffect, useState } from "react"
import { Joystick } from "react-joystick-component"
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick"

interface JoystickControllerProps {
  onMove: (event: IJoystickUpdateEvent) => void
  onStop: (event: IJoystickUpdateEvent) => void
}

export const JoystickController: React.FC<JoystickControllerProps> = ({ onMove, onStop }) => {
  const [joystickKey, setJoystickKey] = useState(0)
  // 움직임이 금지된 상태인지 확인
  const movementProhibition = useAppSelector((state) => state.game.movementProhibition)

  useEffect(() => {
    if (movementProhibition) {
      // 컴포넌트 재마운트 유도
      setJoystickKey((prev) => prev + 1)
    }
  }, [movementProhibition])

  return (
    <div className="absolute bottom-25 left-1/2 transform -translate-x-1/2">
      <Joystick
        key={joystickKey}
        size={100}
        baseColor={movementProhibition ? "rgba(50, 50, 50, 0.2)" : "rgba(50, 50, 50, 0.5)"}
        stickColor={movementProhibition ? "rgba(80, 80, 80, 0.5)" : "rgba(80, 80, 80, 0.8)"}
        move={onMove}
        stop={onStop}
        disabled={movementProhibition}
      />
    </div>
  )
}
