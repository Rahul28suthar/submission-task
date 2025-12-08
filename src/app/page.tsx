"use client";

import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Board from "@/components/Board";
import { Task } from "@/types/task";
import { loadTasks, saveTasks } from "../lib/storage";
import { Button } from "../components/ui/button";
import AddTaskDialog from "../components/AddTaskDialog";
import { v4 as uuidv4 } from "uuid";

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Load tasks from localStorage
  useEffect(() => {
    const stored = loadTasks();
    if (stored) setTasks(stored);
  }, []);

  // Save tasks whenever changed
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: "todo",
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (updated: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id.toString();
    const newStatus = over.id.toString() as Task["status"];

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const columns = ["todo", "in-progress", "done"] as const;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Kanban Board</h1>
        <Button onClick={() => setOpenAddDialog(true)}>Add Task</Button>
      </div>

      <AddTaskDialog
        open={openAddDialog}
        onOpenChange={setOpenAddDialog}
        onSubmit={addTask}
      />

      <DndContext onDragEnd={onDragEnd}>
        <SortableContext items={[...columns]}>
          <Board
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
}
