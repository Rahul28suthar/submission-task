import { Task } from "@/types/task";

const STORAGE_KEY = "kanban_tasks";

export const loadTasks = (): Task[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to load tasks:", err);
    return [];
  }
};

export const saveTasks = (tasks: Task[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error("Failed to save tasks:", err);
  }
};
