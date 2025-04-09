export type Task = {
  id: string;
  title: string;
  content?: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  mood?: "HAPPY" | "SAD" | "EXCITED" | "NEUTRAL" | "STRESSED";
  dueDate?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
  color: string;
};
