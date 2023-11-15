import React, { useState } from "react";
import { ITodoItemProps, TaskItem } from "../../types/app.type";
import './index.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoMain: React.FC<ITodoItemProps> = ({ data, tasks, setTasks }) => {

    const [editMode, setEditMode] = useState<boolean>(false);

    const [editedTask, setEditedTask] = useState<TaskItem>({
        id: "",
        title: "",
        description: "",
        completed: false,
    });

    const handleUpdateTask = () => {
        const updatedTasks = tasks?.map((task) =>
            task.id === editedTask.id ? editedTask : task
        );
        setTasks(updatedTasks);
        setEditMode(false);
        setEditedTask({ id: "", title: "", description: "", completed: false });
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditedTask({ id: "", title: "", description: "", completed: false });
    };

    const handleDeleteTask = (taskId: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const handleEdit = (task: TaskItem) => {
        setEditMode(true);
        setEditedTask(task);
    };

    const toggleCompletion = (taskId: string) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };


    function handleOnDragEnd(result: any) {
        if (!result.destination) return;

        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTasks(items);
    }

    return (
        <section className="main">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <ul className="list-task characters" {...provided.droppableProps} ref={provided.innerRef}>
                            {data?.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task-item text">
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
                                                        <button className="btn" onClick={handleUpdateTask}>
                                                            Update
                                                        </button>
                                                        <button className="btn cancel" onClick={handleCancelEdit}>
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
                                                            onClick={() => handleDeleteTask(task.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button className="btn" onClick={() => handleEdit(task)}>
                                                            Edit
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    )
}

export default TodoMain;

