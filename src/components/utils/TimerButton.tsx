import React, { useState, useEffect } from 'react';


const TimerButton = ({label, onButtonClick, className, disabledClassName} : {label: string, onButtonClick: () => void, className: string, disabledClassName: string}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleClick = () => {
    setIsButtonDisabled(true);
    setTimeLeft(300); // 5 minutes in seconds

    onButtonClick();
    // Simulate button action
    console.log('Button clicked!');

    // Start the countdown
    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          setIsButtonDisabled(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    let timer : any;
    if (isButtonDisabled) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsButtonDisabled(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isButtonDisabled]);

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isButtonDisabled} className={isButtonDisabled ? disabledClassName : className}>
        {isButtonDisabled ? `Aguarde ${formatTime(timeLeft)} min` : label}
      </button>
    </div>
  );
};

export default TimerButton;