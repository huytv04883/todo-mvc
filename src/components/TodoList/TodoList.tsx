import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "./TodoList.type";
import "./index.css";

const TodoListApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    completed: false,
  });
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    completed: false,
  });

  const [errors, setErrors] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const titleInputRef = useRef<HTMLInputElement>(null);

  const validateInput = () => {
    let isValid = true;
    const newErrors = { title: "", description: "" };

    if (newTask.title.trim() === "") {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (newTask.description.trim() === "") {
      newErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addTask = () => {
    if (newTask.title.trim() !== "") {
      const newTaskWithId = { ...newTask, id: uuidv4() };
      setTasks([...tasks, newTaskWithId]);
      setNewTask({ id: "", title: "", description: "", completed: false });
    }

    if (validateInput()) {
      const newTaskWithId = { ...newTask, id: uuidv4() };
      setTasks([...tasks, newTaskWithId]);
      setNewTask({ id: "", title: "", description: "", completed: false });
      setErrors({ title: "", description: "" });
    }
  };

  const startEdit = (task: Task) => {
    setEditMode(true);
    setEditedTask(task);
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );
    setTasks(updatedTasks);
    setEditMode(false);
    setEditedTask({ id: "", title: "", description: "", completed: false });
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditedTask({ id: "", title: "", description: "", completed: false });
  };

  const toggleCompletion = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks?.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "pending") {
      return !task.completed;
    }
    return true;
  });

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  return (
    <div className="wrapper">
      <section className="todo-app">
        <header className="header">
          <div className="header-content">
            <div className="field-item">
              <input
                className="field"
                type="text"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                ref={titleInputRef}
              />
              <span className="error-message">{errors.title}</span>
            </div>
            <div className="field-item">
              <input
                className="field"
                type="text"
                placeholder="Enter task description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
              <span className="error-message">{errors.description}</span>
            </div>
            <button className="btn-addnew" onClick={addTask}>
              Add
            </button>
          </div>
        </header>
        <section className="main">
          <ul className="list-task">
            {filteredTasks.map((task) => (
              <li className="task-item" key={task.id}>
                {editMode && editedTask.id === task.id ? (
                  <div className="update">
                    <div className="fields">
                      <input
                        className="field active"
                        type="text"
                        value={editedTask.title}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            title: e.target.value,
                          })
                        }
                      />
                      <input
                        className="field active"
                        type="text"
                        value={editedTask.description}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="action">
                      <button className="btn" onClick={updateTask}>
                        Update
                      </button>
                      <button className="btn cancel" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="content">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleCompletion(task.id)}
                      />
                      <span>{task.title}</span>
                    </div>
                    <div className="action">
                      <button
                        className="btn cancel"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                      <button className="btn" onClick={() => startEdit(task)}>
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
        <footer className="footer">
          <div>
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "all" | "completed" | "pending")
              }
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default TodoListApp;
