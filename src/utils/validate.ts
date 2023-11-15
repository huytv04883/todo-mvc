import { ERROR_DESCRIPTION, ERROR_TITLE } from "../constant/constant";
import { ErrorMsg, TaskItem } from "../types/app.type";

export const validateForm = (newTask: TaskItem, setErrors: (item: ErrorMsg) => void) => {
    let isValid = true;
    const newErrors = { title: "", description: "" };

    if (newTask.title.trim() === "") {
        newErrors.title = ERROR_TITLE;
        isValid = false;
    }

    if (newTask.description.trim() === "") {
        newErrors.description = ERROR_DESCRIPTION;
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
};

