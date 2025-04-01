// entities/Joystick/ui/JoystickController.tsx
import { Joystick } from 'react-joystick-component';
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';

interface JoystickControllerProps {
  onMove: (event: IJoystickUpdateEvent) => void;
  onStop: (event: IJoystickUpdateEvent) => void;
}

export const JoystickController: React.FC<JoystickControllerProps> = ({ 
  onMove, 
  onStop 
}) => {
  return (
    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
      <Joystick 
        size={100} 
        baseColor="rgba(50, 50, 50, 0.5)" 
        stickColor="rgba(80, 80, 80, 0.8)" 
        move={onMove} 
        stop={onStop}
      />
    </div>
  );
};
