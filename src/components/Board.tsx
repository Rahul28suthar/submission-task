"use client";

import Column from "./Column";
import { Task } from "@/types/task";

interface BoardProps {
  tasks: Task[];
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export default function Board({ tasks, updateTask, deleteTask }: BoardProps) {
  const columns = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((col) => (
        <Column
          key={col.id}
          id={col.id}
          title={col.title}
          tasks={tasks.filter((task) => task.status === col.id)}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}
