import { usetasks } from '@/contextStore/task';

import React from 'react'

function AddTask() {
  const {taskData, setTaskData, handleAddtask,  handleDeletetask, handleUpdateTask} = usetasks();

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  React.useEffect(() => {
    if (
      taskData.title.length > 0 &&
      taskData.description.length > 0
    ) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [taskData]);

  const onAddTask = async (e:any) => {
    e.preventDefault();
    console.log('taskData', taskData);
    if(taskData.isEdit) {
      handleUpdateTask(taskData);
    } else {
    handleAddtask(taskData);
    }
  };

 

  return (
    <>
    <div className=" py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 w-11/12 max-w-xl sm:mx-auto">
        <div className="relative p-8 bg-white shadow-sm sm:rounded-xl">
          <form className="w-full">
            <div className="mb-5 relative">
              <input
                type="text"
                id="title"
                 value={taskData.title}
                  onChange={(e) =>{setTaskData({...taskData, title: e.target.value})}}
                className="peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                placeholder="Today I will..."
                autoComplete="off"
              />
              <label
                htmlFor="title"
                className="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
              >
                Today I will...
              </label>
            </div>
            <div className="mb-5 relative">
              <input
                type="text"
                id="description"
                value={taskData.description}
                onChange={(e) =>{setTaskData({...taskData, description: e.target.value})}}
                className="peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                placeholder="description here ..." 
                autoComplete="off"
              />
              <label
                htmlFor="description"
                className="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
              >
                description here ...
              </label>
            </div>
            <button
            disabled={buttonDisabled}
              onClick={(e:any) => {onAddTask(e)}}
              className={`
              ${buttonDisabled ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'} w-full bg-gray-600 text-white p-3 rounded-md`}
            >
            {taskData.isEdit ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default AddTask
