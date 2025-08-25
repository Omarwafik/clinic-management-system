import { motion } from 'framer-motion';
import { useScrollAnimation } from './useScrollAnimation';

// Fade In Animation
export const FadeIn = ({ children, delay = 0, duration = 0.6, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

// Scroll Triggered Fade In Animation
export const ScrollFadeIn = ({ children, delay = 0, duration = 0.6, threshold = 0.1, ...props }) => {
  const { ref, isInView } = useScrollAnimation(threshold);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scroll Triggered Slide In From Left
export const ScrollSlideInLeft = ({ children, delay = 0, duration = 0.6, threshold = 0.1, ...props }) => {
  const { ref, isInView } = useScrollAnimation(threshold);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scroll Triggered Slide In From Right
export const ScrollSlideInRight = ({ children, delay = 0, duration = 0.6, threshold = 0.1, ...props }) => {
  const { ref, isInView } = useScrollAnimation(threshold);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scroll Triggered Scale In Animation
export const ScrollScaleIn = ({ children, delay = 0, duration = 0.5, threshold = 0.1, ...props }) => {
  const { ref, isInView } = useScrollAnimation(threshold);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scroll Triggered Staggered Container
export const ScrollStaggerContainer = ({ children, staggerDelay = 0.1, threshold = 0.1, ...props }) => {
  const { ref, isInView } = useScrollAnimation(threshold);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scroll Triggered Staggered Item
export const ScrollStaggerItem = ({ children, ...props }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

// Scroll Triggered Bounce Animation
export const ScrollBounce = ({ children, delay = 0, threshold = 0.1, ...props }) => {
  const { ref, isInView } = useScrollAnimation(threshold);
  
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scroll Triggered Rotate In Animation
export const ScrollRotateIn = ({ children, delay = 0, duration = 0.6, threshold = 0.1, ...props }) => {
  const { ref, isInView } = useScrollAnimation(threshold);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
      animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: -180, scale: 0.5 }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scroll Triggered Flip Animation
export const ScrollFlip = ({ children, delay = 0, duration = 0.6, threshold = 0.1, ...props }) => {
  const { ref, isInView } = useScrollAnimation(threshold);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateY: 90 }}
      animate={isInView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: 90 }}
      transition={{ duration, delay, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide In From Left
export const SlideInLeft = ({ children, delay = 0, duration = 0.6, ...props }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

// Slide In From Right
export const SlideInRight = ({ children, delay = 0, duration = 0.6, ...props }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

// Scale In Animation
export const ScaleIn = ({ children, delay = 0, duration = 0.5, ...props }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration, delay, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

// Staggered Children Animation
export const StaggerContainer = ({ children, staggerDelay = 0.1, ...props }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// Staggered Item
export const StaggerItem = ({ children, ...props }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

// Hover Animation for Cards
export const HoverCard = ({ children, ...props }) => (
  <motion.div
    whileHover={{ 
      y: -10, 
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

// Button Animation
export const AnimatedButton = ({ children, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
    {...props}
  >
    {children}
  </motion.button>
);

// Page Transition
export const PageTransition = ({ children, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

// Loading Spinner
export const LoadingSpinner = ({ size = 40, color = "#007bff" }) => (
  <motion.div
    style={{
      width: size,
      height: size,
      border: `3px solid ${color}20`,
      borderTop: `3px solid ${color}`,
      borderRadius: "50%",
      margin: "0 auto"
    }}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
);

// Bounce Animation
export const Bounce = ({ children, delay = 0, ...props }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// Pulse Animation
export const Pulse = ({ children, ...props }) => (
  <motion.div
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    {...props}
  >
    {children}
  </motion.div>
);
