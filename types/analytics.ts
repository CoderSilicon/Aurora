export interface AnalyticsData {
  label: string
  value: number
  status?: "active" | "inactive"
}

export interface AnalyticsStats {
  total: number
  average: number
  peak: number
}
