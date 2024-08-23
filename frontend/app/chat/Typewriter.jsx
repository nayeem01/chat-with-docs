import { useState, useEffect } from "react";

const Typewriter = ({ text, delay, infinite }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [lineCount, setLineCount] = useState(0);


  useEffect(() => {
    let timeout;

    if (currentIndex < text.length) {
      // Ensure currentIndex is within bounds
      timeout = setTimeout(() => {
        const nextChar = text[currentIndex];
        setCurrentText((prevText) => {
          const newText = prevText + nextChar;
          const newLineCount = (newText.match(/\n/g) || []).length;

          if (newLineCount > lineCount && newLineCount % 2 === 0) {
            window.scrollTo(0, document.body.scrollHeight);
          }

          setLineCount(newLineCount);
          return newText;
        });
        setCurrentIndex((prevIndex) => prevIndex + 1);
        // window.scrollTo(0, document.body.scrollHeight);
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
