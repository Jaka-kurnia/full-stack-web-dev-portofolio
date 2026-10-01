import { useState, useEffect } from 'react';

// Custom hook for typing animation
export const useTypewriter = (text, speed = 100, pause = 2000) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer;
        const currentLength = displayedText.length;
        const fullLength = text.length;

        if (!isDeleting && currentLength < fullLength) {
            timer = setTimeout(() => {
                setDisplayedText(text.slice(0, currentLength + 1));
            }, speed);
        } else if (!isDeleting && currentLength === fullLength) {
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, pause);
        } else if (isDeleting && currentLength > 0) {
            timer = setTimeout(() => {
                setDisplayedText(text.slice(0, currentLength - 1));
            }, speed / 2);
        } else if (isDeleting && currentLength === 0) {
            setIsDeleting(false);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, text, speed, pause]);

    return displayedText;
};

export default useTypewriter;
