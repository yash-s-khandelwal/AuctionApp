import React, { useEffect, useState } from "react";

function AuctionTimer({ endTime }) {
  
  const calculateTimeLeft = () => {
  const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor((difference)/(1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <p>
      ⏳{timeLeft.days || "00"}d {timeLeft.hours || "00"}h {timeLeft.minutes || "00"}m{" "}
      {timeLeft.seconds || "00"}s
    </p>
  );
}

export default AuctionTimer;
