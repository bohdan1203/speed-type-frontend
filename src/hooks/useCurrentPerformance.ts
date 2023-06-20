import { useState, useEffect } from "react";
import { calculateRoundedFloat } from "../util/calculateRoundedFloat";

import useTyping from "./useTyping";

function useCurrentPerformance() {
  const [mistakes, setMistakes] = useState(0);
  const [currentAccuracy, setCurrentAccuracy] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);

  const { typed, startedAt } = useTyping();

  useEffect(() => {
    const curAccuracy =
      Number(
        (
          ((typed.length - Math.min(mistakes, typed.length)) / typed.length) *
          100
        ).toFixed(2)
      ) || 0;

    const curSpeed = calculateRoundedFloat(
      typed.length / (Date.now() - (startedAt as number)) / 5
    );

    setCurrentAccuracy(curAccuracy);
    setCurrentSpeed(curSpeed);
  }, [typed, mistakes, startedAt]);

  function resetCurrentPerformance() {
    setMistakes(0);
    setCurrentAccuracy(0);
    setCurrentSpeed(0);
  }

  return {
    mistakes,
    setMistakes,
    currentAccuracy,
    setCurrentAccuracy,
    currentSpeed,
    setCurrentSpeed,
    resetCurrentPerformance,
  };
}

export default useCurrentPerformance;
