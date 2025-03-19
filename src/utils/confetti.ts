
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
  const confettiCount = options?.count || 100;
  
  jsConfetti.addConfetti({
    emojis: options?.emojis || defaultEmojis,
    confettiNumber: confettiCount,
  });
};

export const triggerLoginConfetti = () => {
  triggerConfetti({
    emojis: ['✨', '👋', '🎉', '🚀'],
  });
};

export const triggerCourseCompletionConfetti = () => {
  triggerConfetti({
    emojis: ['🎓', '🏆', '🎉', '🥳', '👏'],
    count: 150,
  });
};

export const triggerCreationConfetti = () => {
  triggerConfetti({
    emojis: ['✨', '📝', '🎨', '🚀', '💡'],
  });
};

export const triggerOdysseyConfetti = () => {
  triggerConfetti({
    emojis: ['🎯', '🧭', '🌟', '🚀', '🔥'],
  });
};
