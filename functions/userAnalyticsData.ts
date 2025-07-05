import type { AnalyticsData, AnalyticsStats } from "@/types/analytics" 

/**
 * User Analytics Utility Functions
 * These functions will later be replaced with Prisma database calls
 */

// Default weekly data pattern
export const getWeeklyData = (): AnalyticsData[] => {
  return [
    { label: "M", value: 45, status: "inactive" },
    { label: "T", value: 78, status: "active" },
    { label: "W", value: 65, status: "active" },
    { label: "T", value: 92, status: "active" },
    { label: "F", value: 34, status: "inactive" },
    { label: "S", value: 23, status: "inactive" },
    { label: "S", value: 56, status: "inactive" },
  ]
}

// Default monthly data pattern
export const getMonthlyData = (): AnalyticsData[] => {
  return [
    { label: "Jan", value: 120, status: "active" },
    { label: "Feb", value: 98, status: "inactive" },
    { label: "Mar", value: 156, status: "active" },
    { label: "Apr", value: 89, status: "inactive" },
    { label: "May", value: 134, status: "active" },
    { label: "Jun", value: 67, status: "inactive" },
  ]
}



// Calculate analytics statistics
export const calculateStats = (data: AnalyticsData[]): AnalyticsStats => {
  if (data.length === 0) {
    return { total: 0, average: 0, peak: 0 }
  }

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const average = Math.round(total / data.length)
  const peak = Math.max(...data.map((item) => item.value))

  return { total, average, peak }
}

// Calculate bar height for visualization
export const calculateBarHeight = (value: number, maxValue: number, maxHeight = 120): number => {
  if (maxValue === 0) return 8
  return Math.max((value / maxValue) * maxHeight, 8)
}

// Get bar styling based on status and index
export const getBarStyle = (item: AnalyticsData, index: number, maxValue: number, maxHeight = 120) => {
  const height = calculateBarHeight(item.value, maxValue, maxHeight)

  if (item.status === "active") {
    // Different shades of green for active items
    const greenShades = ["#27272a", "#18181b", "#09090b"] // zinc-800, zinc-900, zinc-950
    const color = greenShades[index % greenShades.length]
    return {
      height: `${height}px`,
      backgroundColor: color,
      backgroundImage: "none",
    }
  } else {
    // Slanted black lines for inactive items
    return {
      height: `${height}px`,
      backgroundColor: "#f3f4f6", // light gray background
      backgroundImage: `repeating-linear-gradient(
        45deg,
        #000000,
        #000000 1px,
        transparent 1px,
        transparent 4px
      )`,
    }
  }
}

// Validate data point before adding
export const validateDataPoint = (label: string, value: string): { isValid: boolean; error?: string } => {
  if (!label.trim()) {
    return { isValid: false, error: "Label is required" }
  }

  if (!value.trim()) {
    return { isValid: false, error: "Value is required" }
  }

  const numValue = Number.parseInt(value)
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: "Value must be a positive number" }
  }

  return { isValid: true }
}

// Future Prisma integration placeholder functions
// These will be replaced with actual database calls

/**
 * Future Prisma Functions (to be implemented)
 */

// export const fetchUserAnalytics = async (userId: string): Promise<AnalyticsData[]> => {
//   // TODO: Replace with Prisma call
//   // const analytics = await prisma.analytics.findMany({
//   //   where: { userId },
//   //   orderBy: { createdAt: 'asc' }
//   // })
//   // return analytics.map(item => ({
//   //   label: item.label,
//   //   value: item.value,
//   //   status: item.status as "active" | "inactive"
//   // }))
//   return getWeeklyData()
// }

// export const saveAnalyticsData = async (
//   userId: string,
//   data: AnalyticsData[]
// ): Promise<boolean> => {
//   // TODO: Replace with Prisma call
//   // await prisma.analytics.deleteMany({ where: { userId } })
//   // await prisma.analytics.createMany({
//   //   data: data.map(item => ({
//   //     userId,
//   //     label: item.label,
//   //     value: item.value,
//   //     status: item.status || "active"
//   //   }))
//   // })
//   return true
// }

// export const addAnalyticsPoint = async (
//   userId: string,
//   dataPoint: AnalyticsData
// ): Promise<AnalyticsData> => {
//   // TODO: Replace with Prisma call
//   // const newPoint = await prisma.analytics.create({
//   //   data: {
//   //     userId,
//   //     label: dataPoint.label,
//   //     value: dataPoint.value,
//   //     status: dataPoint.status || "active"
//   //   }
//   // })
//   // return {
//   //   label: newPoint.label,
//   //   value: newPoint.value,
//   //   status: newPoint.status as "active" | "inactive"
//   // }
//   return dataPoint
// }
