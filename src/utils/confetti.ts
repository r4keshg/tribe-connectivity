
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
  const confettiCount = options?.count || 15; // Reduced from 30 to 15
  
  jsConfetti.addConfetti({
    emojis: options?.emojis || defaultEmojis,
    confettiNumber: confettiCount,
  });
};

export const triggerLoginConfetti = () => {
  triggerConfetti({
    emojis: ['✨', '👋', '🎉', '🚀'],
    count: 10, // Reduced count for login
  });
};

export const triggerCourseCompletionConfetti = () => {
  triggerConfetti({
    emojis: ['🎓', '🏆', '🎉', '🥳', '👏'],
    count: 20, // Reduced from 40 to 20
  });
};

export const triggerCreationConfetti = () => {
  triggerConfetti({
    emojis: ['✨', '📝', '🎨', '🚀', '💡'],
    count: 10, // Reduced count
  });
};

export const triggerOdysseyConfetti = () => {
  triggerConfetti({
    emojis: ['🎯', '🧭', '🌟', '🚀', '🔥'],
    count: 15, // Reduced count
  });
};
