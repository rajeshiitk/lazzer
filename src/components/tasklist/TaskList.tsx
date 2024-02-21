"use  client";
import { task, useTasks } from "@/contextStore/task";
import { Edit } from "lucide-react";
import React from "react";

function TaskList() {
  const { tasks, getTasks } = useTasks();
  React.useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {!!tasks.length ? (
        <div className="w-full md:max-w-lg mx-auto h-full sticky    bg-white p-8 rounded-xl shadow shadow-slate-300">
          {/* <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-medium">Tasks list</h1>
            </div>
            <div className="inline-flex space-x-2 items-center">
              <a
                href="#"
                className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-indigo-200 hover:text-white bg-indigo-600 hover:bg-indigo-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium hidden md:block">
                  Urgent
                </span>
              </a>
              <a
                href="#"
                className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center hover:bg-slate-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span className="text-sm hidden md:block">Latest</span>
              </a>
            </div>
          </div> */}
          {/* <p className="text-slate-500">Hello, here are your tasks</p> */}
          <div id="tasks" className="my-5 h-full sticky overflow-y-auto">
            {/* task item */}
            {tasks.map((task: any) => {
              return <TaskItem key={task._id} item={task} />;
            })}
          </div>
          {/* <p className="text-xs text-slate-500 text-center">
            Last updated 12 minutes ago
          </p> */}
        </div>
      ) : (
        "No tasks found"
      )}
    </>
  );
}

export const TaskItem = ({ item }: any) => {
  const { handleDeletetask, toggleTaskAsCompleted, setTaskData } = useTasks();

  const onEdit = (item: task) => {
    setTaskData(() => {
      return { ...item, isEdit: true };
    });
  };
  return (
    <div
      id="task"
      className="flex justify-between items-center rounded-lg overflow-hidden border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
    >
      <div className="inline-flex items-center space-x-2">
        <div>
          <input
            type="checkbox"
            onChange={() => toggleTaskAsCompleted(item)}
            checked={item.completed}
            className="form-checkbox h-5 w-5 text-slate-600"
          />
        </div>
        <div>{item.title}</div>
      </div>
      <div className="flex gap-2 ">
        <Edit
          onClick={() => onEdit(item)}
          className="w-4 h-4 text-slate-500 hover:text-slate-700 hover:cursor-pointer"
        />
        <div onClick={() => handleDeletetask(item._id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 text-slate-500 hover:text-slate-700 hover:cursor-pointer"
          >
            jk
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
