
import { useEffect, useState, useRef } from 'react';

export const useInView = (ref: React.RefObject<HTMLElement>, options = {}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);
  
  return isInView;
};

export const useAnimatedCounter = (
  target: number,
  duration: number = 2000,
  startOnView: boolean = true
) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if ((isInView || !startOnView) && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const startTime = Date.now();
      const endTime = startTime + duration;
      
      const updateCounter = () => {
        const now = Date.now();
        const progress = Math.min(1, (now - startTime) / duration);
        
        if (progress < 1) {
          setCount(Math.floor(progress * target));
          requestAnimationFrame(updateCounter);
        } else {
          setCount(target);
        }
      };
      
      requestAnimationFrame(updateCounter);
    }
  }, [isInView, target, duration, startOnView]);
  
  return { count, ref };
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const stagger = (delay = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: delay
    }
  }
});

export const useTypewriterEffect = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayText("");
    setIsComplete(false);
    
    const typing = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(typing);
      }
    }, speed);
    
    return () => clearInterval(typing);
  }, [text, speed]);
  
  return { displayText, isComplete };
};
