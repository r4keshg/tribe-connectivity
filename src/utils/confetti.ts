
import JSConfetti from 'js-confetti';

// Create a reusable confetti instance
let jsConfetti: JSConfetti | null = null;

// Initialize confetti on first use
const getConfetti = () => {
  if (!jsConfetti) {
    jsConfetti = new JSConfetti();
  }
  return jsConfetti;
};

// Trigger confetti for course completion
export const triggerCourseCompletionConfetti = () => {
  const confetti = getConfetti();
  
  // Create an explosion of confetti
  confetti.addConfetti({
    confettiColors: [
      '#FF5757', '#FFC857', '#70D6FF', '#5CE1E6', '#FF9E7A', '#A3E048'
    ],
    confettiRadius: 6,
    confettiNumber: 200
  });
  
  // Follow up with some emojis
  setTimeout(() => {
    confetti.addConfetti({
      emojis: ['🎓', '🏆', '🥇', '⭐', '✅'],
      emojiSize: 50,
      confettiNumber: 30
    });
  }, 800);
};

// Trigger confetti for clan or blog creation
export const triggerCreationConfetti = () => {
  const confetti = getConfetti();
  
  confetti.addConfetti({
    confettiColors: [
      '#22c55e', '#7c3aed', '#06b6d4', '#F97316', '#8b5cf6'
    ],
    confettiRadius: 5,
    confettiNumber: 100
  });
};

// Trigger confetti for achievements
export const triggerAchievementConfetti = () => {
  const confetti = getConfetti();
  
  confetti.addConfetti({
    emojis: ['🎉', '🎊', '🥳', '👏', '🔥'],
    emojiSize: 40, 
    confettiNumber: 40
  });
};

// Trigger confetti for login
export const triggerLoginConfetti = () => {
  const confetti = getConfetti();
  
  confetti.addConfetti({
    confettiColors: [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'
    ],
    confettiRadius: 4,
    confettiNumber: 80
  });
};

// Trigger confetti for odyssey
export const triggerOdysseyConfetti = () => {
  const confetti = getConfetti();
  
  confetti.addConfetti({
    emojis: ['🚀', '🌟', '💫', '✨', '🔥'],
    emojiSize: 45,
    confettiNumber: 35
  });
};
