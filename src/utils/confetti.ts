
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
  const confettiCount = options?.count || 30; // Reduced from 100 to 30
  
  jsConfetti.addConfetti({
    emojis: options?.emojis || defaultEmojis,
    confettiNumber: confettiCount,
  });
};

export const triggerLoginConfetti = () => {
  triggerConfetti({
    emojis: ['✨', '👋', '🎉', '🚀'],
    count: 25, // Reduced count for login
  });
};

export const triggerCourseCompletionConfetti = () => {
  triggerConfetti({
    emojis: ['🎓', '🏆', '🎉', '🥳', '👏'],
    count: 40, // Reduced from 150 to 40
  });
};

export const triggerCreationConfetti = () => {
  triggerConfetti({
    emojis: ['✨', '📝', '🎨', '🚀', '💡'],
    count: 25, // Reduced count
  });
};

export const triggerOdysseyConfetti = () => {
  triggerConfetti({
    emojis: ['🎯', '🧭', '🌟', '🚀', '🔥'],
    count: 30, // Reduced count
  });
};
