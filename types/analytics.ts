export interface AnalyticsData {
  label: string
  value: number
  status: "active" | "inactive"
}

export interface AnalyticsStats {
  total: number
  average: number
  peak: number
}

export interface MoodData {
  label: string
  moodId: string
  score: number
  emoji: string
  color: string
  date?: string
  count?: number
}

export interface MoodStats {
  averageScore: number
  totalEntries: number
  mostCommonMood: string
  moodTrend: string
  scoreDistribution: { [key: number]: number }
  moodDistribution: { [key: string]: number }
}
