import React, { useEffect, useState } from "react";

const Counter = ({ target, duration = 4000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (isNaN(end)) return;

    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
};

export default Counter;
