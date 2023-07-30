import { useEffect, useState } from "react";

export const useKeyboardSubmarine = () => {
  const keys = { KeyW: 'forward', KeyS: 'backward', KeyA: 'left', KeyD: 'right', KeyK: 'rotateUp', KeyI: 'rotateDown', ControlLeft: 'up', Space: 'down'};
  const moveFieldByKey = (key) => keys[key];

  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, up: false, down: false, rotateUp: false, rotateDown: false });

  useEffect(() => {
    const handleKeyDown = (e) => setMovement((_movement) => ({ ..._movement, [moveFieldByKey(e.code)]: true }));
    const handleKeyUp = (e) => setMovement((_movement) => ({ ..._movement, [moveFieldByKey(e.code)]: false }));
    


    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
};
