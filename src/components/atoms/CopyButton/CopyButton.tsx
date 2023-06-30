import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';

interface CopyButtonProps {
  text: string;
  style: React.CSSProperties;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, style }) => {
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = async () => {
    let isSuccess = false;
    if (inputRef.current) {
    try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        isSuccess = true;
      } catch (error) {
        console.error('Failed to copy text:', error);
      }
      if(!isSuccess){
       // This below code will execute if any browser that will not support the above code written in try block. For that reason we have isSuccess flag.
        inputRef.current.select();
        document.execCommand('copy');   
        setIsCopied(true);
      }
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <>
      <input
        type="text"
        value={text}
        readOnly
        ref={inputRef}
        style={{ position: 'absolute', left: '-9999px' }} // used to position the input element off-screen so that it remains hidden from the user's view. commonly used when you want to programmatically copy text to the clipboard without the input element being visible on the page. 'display: none' wouldn't have worked in copying text, same for visibilty hidden.
      />
      <button onClick={handleCopy} style={{ background: 'transparent', border:'none'}}>
        {isCopied ? (
          <>
            <FontAwesomeIcon icon={faCheck} style={style} />
            {/* <span style={{ marginLeft: '0.5rem' }}>Copied!</span> */} 
            {/* Above text add it if required */}
          </>
        ) : (
           <FontAwesomeIcon icon={faCopy} style={style}/>
        )}
      </button>
    </>
  );
};

export default CopyButton;
