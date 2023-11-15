import React, { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../../constant/constant";
import { TaskItem } from "../../types/app.type";
import TodoFooter from "../TodoFooter/Index";
import TodoHeader from "../TodoHeader/Index";
import TodoMain from "../TodoMain/Index";
import "./index.css";

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '') || []
    // Init tasks: If exists data local storage => set data || []
  });

  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  
  const filteredTasks = tasks?.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "pending") {
      return !task.completed;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    // Any update set data tasks to local storage
  }, [tasks]);

  return (
    <div className="wrapper">
      <section className="todo-app">
        <TodoHeader tasks={tasks} setTasks={setTasks} />
        <TodoMain data={filteredTasks} tasks={tasks} setTasks={setTasks} />
        <TodoFooter filter={filter} setFilter={setFilter} countNumber={filteredTasks?.length} />
      </section>
    </div>
  );
};

export default TodoApp;
