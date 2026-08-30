import { useState, useEffect } from 'react';

export default function useWindowDimensions() {

  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}


/**
 * HourRounding
 * @param value
 * 
 * Accepts value which is a value in minutes. 
 * This function will return the value in hours in string format 
 */
export function HourRoundingToString(value: number): string {
  
  const roundedVal = (value/60)
  console.log("roundedVal: ", roundedVal)
  if (roundedVal < 1) {
    // 0.25, 0.5, 0.75
    // multiply by 60 to convert ratio to time
    return (roundedVal * 60) + " minutes"
  } else {
    // split value into 2 parts: whole number and fraction
    const whole = Math.trunc(roundedVal)
    const fractional = roundedVal - whole
    console.log("whole: ", whole)
    console.log("fractional: ", fractional)
    const hoursString = whole > 1 ? " hrs" : " hr" 
    
    let time = whole + hoursString
    if (fractional > 0) {
      const mins = Math.round(fractional * 60)
      time += " " + mins + " mins"
    }
    console.log("time: ", time)
    return time
  }
}