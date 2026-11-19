import { useState, useEffect } from 'react';
import { Task, ColumnId, Priority } from '../types/kanban';
import { INITIAL_TASKS } from '../data/initialTasks';

const STORAGE_KEY = 'devpulse_kanban_tasks';

export function useKanban() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      console.warn('Failed to parse saved tasks from localStorage');
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      console.warn('Failed to save tasks to localStorage');
    }
  }, [tasks]);

  const moveTask = (taskId: string, targetStatus: ColumnId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: targetStatus } : task
      )
    );
  };

  const addTask = (newTask: {
    title: string;
    description: string;
    priority: Priority;
    status: ColumnId;
    tags: string[];
    assignee?: string;
  }) => {
    const task: Task = {
      ...newTask,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTasks((prev) => [task, ...prev]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const resetToDefault = () => {
    setTasks(INITIAL_TASKS);
  };

  return {
    tasks,
    moveTask,
    addTask,
    deleteTask,
    resetToDefault,
  };
}
