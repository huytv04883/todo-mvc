import { Dispatch, SetStateAction } from "react";

export interface TaskItem {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export interface ITodoItemProps {
    data: TaskItem[];
    tasks: TaskItem[];
    setTasks: (item: TaskItem[]) => void;
}

export interface ErrorMsg {
    title: string;
    description: string;
}

export interface ITodoHeaderProps {
    tasks: TaskItem[];
    setTasks: (item: TaskItem[]) => void;
}

export interface ITodoFooterProps {
    filter: string;
    countNumber: number;
    setFilter: Dispatch<SetStateAction<"all" | "completed" | "pending">>;
}
