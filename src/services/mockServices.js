/**
 * Development-only data and service adapters.
 *
 * This mirrors the Firestore collections that the production app will read
 * from, while keeping the MVP fully functional without a network connection.
 */
export const firestoreSchema = {
  users: {
    'demo-member': {
      displayName: 'Demo member',
      recoveryStartDate: '2026-01-01',
      primaryGoal: 'Move with confidence',
      recoveryIndex: 64,
      therapistId: 'demo-care-team'
    }
  },
  exercises: {
    'knee-flexion': { title: 'Knee flexion', category: 'mobility', targetReps: 12, targetSets: 3 },
    'supported-squats': { title: 'Supported squats', category: 'strength', targetReps: 8, targetSets: 3 }
  },
  dailyLogs: {
    'demo-member_2026-01-01': { completedExerciseIds: ['knee-flexion', 'supported-squats'], formScore: 82 }
  },
  therapistNotes: {
    'demo-note-1': { patientId: 'demo-member', authorId: 'demo-care-team', createdAt: '2026-01-01', status: 'active' }
  }
};

/** Simulates a pose-estimation score returned after an observed rep. */
export const scoreForm = (rep) => Math.min(97, 78 + rep * 2 + Math.floor(Math.random() * 6));

/** Simplified recovery forecast model based on completion consistency. */
export const estimateMilestoneWindow = (completionRate) => {
  if (completionRate >= 80) return '3–5 weeks';
  if (completionRate >= 55) return '4–7 weeks';
  return '5–8 weeks';
};
