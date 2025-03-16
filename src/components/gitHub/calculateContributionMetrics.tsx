import { act } from "react";

export default function calculateContributionMetrics(
  weeks: any,
  userName: any
) {
  let totalCommits = 0;
  let maxStreak = 0;
  let currentStreak = 0;
  let activeDays = 0;
  let daysWithoutCommits = 0;
  let weeklyCommitCounts = [] as any;
  let streak = 0;

  weeks.forEach((week: any) => {
    let weeklyCommits = 0;
    week.contributionDays.forEach((day: any) => {
      const { contributionCount } = day;
      totalCommits += contributionCount;
      weeklyCommits += contributionCount;

      if (contributionCount > 0) {
        streak++;
        activeDays++;
        if (streak > maxStreak) maxStreak = streak;
      } else {
        streak = 0;
      }
    });
    weeklyCommitCounts.push(weeklyCommits);
  });

  // Average weekly commits
  const averageWeeklyCommits = totalCommits / weeklyCommitCounts.length;

  // Current streak calculation
  currentStreak = streak;

  // Commit frequency and consistency (strike rate)
  const totalDays = weeks.length * 7;
  const commitFrequency = activeDays / totalDays;
  const commitConsistency =
    weeklyCommitCounts.filter((count: any) => count > 0).length /
    weeklyCommitCounts.length;

  daysWithoutCommits = totalDays - activeDays;

  return {
    totalCommits,
    maxStreak,
    averageWeeklyCommits,
    currentStreak,
    commitFrequency,
    commitConsistency,
    userName,
    activeDays,
    daysWithoutCommits,
  };
}
