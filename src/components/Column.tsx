"use client";

import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { Task } from "@/types/task";

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export default function Column({
  id,
  title,
  tasks,
  updateTask,
  deleteTask,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="bg-white shadow-sm rounded-xl p-4 border">
      <h2 className="text-xl font-semibold mb-4 text-black">{title}</h2>


      <div
        ref={setNodeRef}
        className="space-y-3 min-h-[200px] transition-all"
      >
        {tasks.length === 0 && (
          <p className="text-gray-400 text-sm italic">No tasks here...</p>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
