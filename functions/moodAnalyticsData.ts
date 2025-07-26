import type { MoodData, MoodStats } from "@/types/analytics"
import { getMoodTrend } from "@/data/moods"

/**
 * Mood Analytics Utility Functions
 * These functions will later be replaced with Prisma database calls
 */

// Default weekly mood data pattern with counts
export const getWeeklyMoodData = (): MoodData[] => {
  return [
    { label: "Happy", moodId: "happy", score: 8, emoji: "😊", color: "amber", count: 12 },
    { label: "Motivated", moodId: "motivated", score: 8, emoji: "🎯", color: "emerald", count: 8 },
    { label: "Stressed", moodId: "stressed", score: 3, emoji: "😫", color: "rose", count: 5 },
    { label: "Peaceful", moodId: "peaceful", score: 7, emoji: "😌", color: "blue", count: 7 },
    { label: "Excited", moodId: "excited", score: 8, emoji: "🎉", color: "orange", count: 6 },
    { label: "Tired", moodId: "tired", score: 4, emoji: "😴", color: "purple", count: 4 },
    { label: "Grateful", moodId: "grateful", score: 8, emoji: "🙏", color: "green", count: 9 },
  ]
}

// Default monthly mood data pattern
export const getMonthlyMoodData = (): MoodData[] => {
  return [
    { label: "Overjoyed", moodId: "overjoyed", score: 10, emoji: "🤗", color: "yellow", count: 15 },
    { label: "Inspired", moodId: "inspired", score: 9, emoji: "💫", color: "violet", count: 18 },
    { label: "Confident", moodId: "confident", score: 8, emoji: "💪", color: "emerald", count: 12 },
    { label: "Anxious", moodId: "anxious", score: 3, emoji: "😰", color: "indigo", count: 8 },
    { label: "Sad", moodId: "sad", score: 2, emoji: "😢", color: "cyan", count: 5 },
    { label: "Neutral", moodId: "neutral", score: 5, emoji: "😐", color: "gray", count: 10 },
  ]
}

// Calculate mood analytics statistics
export const calculateMoodStats = (data: MoodData[]): MoodStats => {
  if (data.length === 0) {
    return {
      averageScore: 0,
      totalEntries: 0,
      mostCommonMood: "neutral",
      moodTrend: "No data available",
      scoreDistribution: {},
      moodDistribution: {},
    }
  }

  const totalScore = data.reduce((sum, item) => sum + item.score * (item.count || 1), 0)
  const totalCount = data.reduce((sum, item) => sum + (item.count || 1), 0)
  const averageScore = Math.round((totalScore / totalCount) * 10) / 10

  // Find most common mood by count
  const mostCommonMood = data.reduce((prev, current) =>
    (current.count || 1) > (prev.count || 1) ? current : prev,
  ).moodId

  // Mood distribution
  const moodDistribution: { [key: string]: number } = {}
  data.forEach((item) => {
    moodDistribution[item.moodId] = item.count || 1
  })

  // Score distribution
  const scoreDistribution: { [key: number]: number } = {}
  data.forEach((item) => {
    const count = item.count || 1
    scoreDistribution[item.score] = (scoreDistribution[item.score] || 0) + count
  })

  return {
    averageScore,
    totalEntries: totalCount,
    mostCommonMood,
    moodTrend: getMoodTrend(averageScore),
    scoreDistribution,
    moodDistribution,
  }
}

// Get the most common mood data
export const getMostCommonMoodData = (data: MoodData[]) => {
  if (data.length === 0) return null

  const mostCommon = data.reduce((prev, current) => ((current.count || 1) > (prev.count || 1) ? current : prev))

  const totalCount = data.reduce((sum, item) => sum + (item.count || 1), 0)
  const percentage = Math.round(((mostCommon.count || 1) / totalCount) * 100)

  return {
    ...mostCommon,
    percentage,
  }
}

// Get chart data for right side (excluding most common)
export const getChartMoodData = (data: MoodData[]) => {
  if (data.length === 0) return []

  const mostCommon = data.reduce((prev, current) => ((current.count || 1) > (prev.count || 1) ? current : prev))

  return data
    .filter((item) => item.moodId !== mostCommon.moodId)
    .sort((a, b) => (b.count || 1) - (a.count || 1))
    .slice(0, 6) // Show top 6 other moods
}

/**
 * Future Prisma Functions (to be implemented)
 */

// export const fetchUserMoodAnalytics = async (userId: string): Promise<MoodData[]> => {
//   return getWeeklyMoodData()
// }
