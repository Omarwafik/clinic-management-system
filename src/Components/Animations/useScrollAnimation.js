import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, // Allow re-triggering
    amount: threshold,
    margin: "-50px 0px -50px 0px" // Trigger when element is 50px from viewport
  });

  return { ref, isInView };
};

// Hook for staggered animations
export const useStaggeredScrollAnimation = (itemsCount, threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false,
    amount: threshold,
    margin: "-50px 0px -50px 0px"
  });

  const [animatedItems, setAnimatedItems] = useState(new Array(itemsCount).fill(false));

  useEffect(() => {
    if (isInView) {
      // Animate items one by one
      const timer = setTimeout(() => {
        setAnimatedItems(new Array(itemsCount).fill(true));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedItems(new Array(itemsCount).fill(false));
    }
  }, [isInView, itemsCount]);

  return { ref, isInView, animatedItems };
};

