import { useState, useEffect } from "react";

const Typewriter = ({ text, delay, infinite }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    let timeout;

    if (currentIndex < text.length) {
      // Ensure currentIndex is within bounds
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      // Reset for infinite loop
      timeout = setTimeout(() => {
        setCurrentIndex(0);
        setCurrentText("");
      }, delay);
    } else {
      // Animation complete
      setAnimationComplete(true);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  useEffect(() => {
    if (animationComplete) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [animationComplete]);

  return <span>{currentText}</span>;
};

export default Typewriter;
