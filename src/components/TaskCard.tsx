"use client";

import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Task } from "@/types/task";
import EditTaskDialog from "@/components/EditTaskDialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, GripVertical } from "lucide-react";

interface TaskCardProps {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export default function TaskCard({
  task,
  updateTask,
  deleteTask,
}: TaskCardProps) {
  const [openEdit, setOpenEdit] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes} // draggable props only on wrapper
        className={`rounded-lg border shadow-sm bg-white transition p-4 
        ${isDragging ? "opacity-80 scale-[1.02]" : ""}`}
      >
        {/* Top bar with Drag Handle */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-black">
            {task.title}
          </h3>

          {/* DRAG HANDLE */}
          <div
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 ml-2"
          >
            <GripVertical size={18} />
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          {task.description}
        </p>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setOpenEdit(true);
            }}
          >
            <Pencil size={16} />
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* Edit Dialog */}
      <EditTaskDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        task={task}
        onSave={updateTask}
      />
    </>
  );
}
