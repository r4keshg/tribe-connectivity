
import JSConfetti from 'js-confetti';

// Create a singleton instance
let confettiInstance: JSConfetti | null = null;

const getConfettiInstance = (): JSConfetti => {
  if (!confettiInstance) {
    confettiInstance = new JSConfetti();
  }
  return confettiInstance;
};

export const triggerConfetti = (options?: {
  emojis?: string[];
  count?: number;
}) => {
  const jsConfetti = getConfettiInstance();
  
  const defaultEmojis = ['✨', '🎉', '🎓', '🚀'];
  const confettiCount = options?.count || 8; // Reduced from 15 to 8 for tiny pop
  
  jsConfetti.addConfetti({
    emojis: options?.emojis || defaultEmojis,
    confettiNumber: confettiCount,
    // Configuration for a pop effect
    initialVelocityY: 10,
    spread: 35,
    gravity: 1.5,
    dragFriction: 0.12
  });
};

export const triggerLoginConfetti = () => {
  triggerConfetti({
    emojis: ['✨', '👋', '🎉', '🚀'],
    count: 5, // Reduced count for login
  });
};

export const triggerCourseCompletionConfetti = () => {
  triggerConfetti({
    emojis: ['🎓', '🏆', '🎉', '🥳', '👏'],
    count: 10, // Reduced count for completion
  });
};

export const triggerCreationConfetti = () => {
  triggerConfetti({
    emojis: ['✨', '📝', '🎨', '🚀', '💡'],
    count: 5, // Reduced count
  });
};

export const triggerOdysseyConfetti = () => {
  triggerConfetti({
    emojis: ['🎯', '🧭', '🌟', '🚀', '🔥'],
    count: 7, // Reduced count
  });
};
