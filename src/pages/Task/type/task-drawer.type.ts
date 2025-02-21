import { TaskItem } from "../../../State/AddTask/interface/get-task.interface";

export type TaskDrawerProps = {
    isOpen: boolean;
    toggleDrawer: (isOpen: boolean) => void;
    taskDetails: TaskItem;
    type: string;
  };