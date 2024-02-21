"use client";

import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

export type task = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  isEdit?: boolean; //? means optional
};

export type tasksContext = {
  tasks: task[];
  handleAddtask: (task: task) => void; //call signature
  toggleTaskAsCompleted: (task: task) => void;
  handleDeletetask: (id: string) => void;
  getTasks: () => void;
  handleUpdateTask: (task: task) => void;
  taskData: task;
  // setTaskData: React.Dispatch<React.SetStateAction<task>>;
  setTaskData: any;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const tasksContext = createContext<tasksContext | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [taskData, setTaskData] = useState({
    _id: "",
    title: "",
    description: "",
    completed: false,
    createdAt: new Date(),
    isEdit: false,
  });
  const [tasks, setTasks] = useState<task[]>([]); //an array of task objects
  const [loading, setLoading] = useState(false);

  async function handleAddtask(task: task) {
    try {
      setLoading(true);
      setTaskData({
        ...taskData,
        _id: "",
        title: "",
        description: "",
        completed: false,
        createdAt: new Date(),
        isEdit: false,
      });
      const response = await axios.post("/api/task", task);
      setTasks((prev) => {
        const newtasks = [...prev, response.data.task]; // Remove the extra array brackets []
        return newtasks; // Don't forget to return the updated state
      });
      setLoading(false);
    } catch (error: any) {
      console.log("task add failed", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateTask = async (task: task) => {
    try {
      setTaskData({
        ...taskData,
        _id: "",
        title: "",
        description: "",
        completed: false,
        createdAt: new Date(),
        isEdit: false,
      });
      setLoading(true);
      const response = await axios.put(`/api/task/${task._id}`, task);
      setTasks((prev) => {
        const newtasks = prev.map((task) => {
          if (task._id === response.data.task._id) {
            return response.data.task;
          }
          return task;
        });
        return newtasks;
      });
      setLoading(false);
    } catch (error: any) {
      console.log("task update failed", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // toggletaskAsCompleted
  const toggleTaskAsCompleted = async (task: task) => {
    const newTask = { ...task, completed: !task.completed };
    handleUpdateTask(newTask);
  };

  // handleDeletetask
  async function handleDeletetask(taskId: string) {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/task/${taskId}`); //axios.delete(`/api/task/${taskId}
      setTasks((prev) => {
        const newtasks = prev.filter((task) => task._id !== taskId);
        return newtasks;
      });
      setLoading(false);
    } catch (error: any) {
      console.log("task delete failed", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/task");
      setTasks(response.data.tasks);
      setLoading(false);
    } catch (error: any) {
      console.log("get tasks failed", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tasksContext.Provider
      value={{
        tasks,
        getTasks,
        handleAddtask,
        toggleTaskAsCompleted,
        handleDeletetask,
        handleUpdateTask,
        taskData,
        setTaskData,
        loading,
        setLoading,
      }}
    >
      {children}
    </tasksContext.Provider>
  );
}

export function useTasks() {
  const tasksContextValue = useContext(tasksContext);
  if (!tasksContextValue) {
    throw new Error("useTasks used outside of Provider");
  }

  return tasksContextValue;
}
