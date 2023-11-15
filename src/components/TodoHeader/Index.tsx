import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ErrorMsg, ITodoHeaderProps, TaskItem } from "../../types/app.type";
import { validateForm } from "../../utils/validate";
import './index.css';

const TodoHeader: React.FC<ITodoHeaderProps> = ({ tasks, setTasks }) => {

    const [newTask, setNewTask] = useState<TaskItem>({
        id: "",
        title: "",
        description: "",
        completed: false,
    });

    const [errors, setErrors] = useState<ErrorMsg>({
        title: "",
        description: "",
    });

    const titleInputRef = useRef<HTMLInputElement>(null);

    const addTask = () => {
        const isValid = validateForm(newTask, setErrors);
        if (isValid && newTask.title.trim() !== "") {
            const newTaskWithId = { ...newTask, id: uuidv4() };
            setTasks([...tasks, newTaskWithId]);
            setNewTask({ id: "", title: "", description: "", completed: false });
            setErrors({ title: "", description: "" });
        }
    };

    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, []);

    return (
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
    )
}

export default TodoHeader;
