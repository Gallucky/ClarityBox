import { useState } from "react";
import type { TaskFormData } from "@/types/forms/task/TaskFormData";
import type { Task } from "@/types/models/Task";
import useQuery from "@app/providers/Query/useQuery";
import { TaskRequestError } from "@errors/RequestErrors";

const useTasks = () => {
    const api = useQuery();

    // States
    const [tasks, setTasks] = useState<Task[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const handleTaskError = (error: any, method: string) => {
        const errorAsError = error as Error;
        const err = new TaskRequestError(
            method,
            errorAsError.message,
            errorAsError,
        );
        setError(err);
        throw err;
    };

    //region | ====== Get ====== |

    const getAllTasks = async () => {
        try {
            setLoading(true);
            setError(null);

            const response: Task[] = await api.get("/tasks");

            setTasks(response);

            return response;
        } catch (error) {
            handleTaskError(error, "getAllTasks");
        } finally {
            setLoading(false);
        }
    };

    const getTaskById = async (taskId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response: Task = await api.get(`/tasks/${taskId}`);

            setTasks([response]);

            return response;
        } catch (error) {
            handleTaskError(error, "getTaskById");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Get ====== |

    //region | ====== Post ====== |

    const createTask = async (task: TaskFormData) => {
        try {
            setLoading(true);
            setError(null);

            const response: Task = await api.post("/tasks", task);

            return response;
        } catch (error) {
            handleTaskError(error, "createTask");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Post ====== |

    //region | ====== Put ====== |

    const updateTask = async (taskId: string, task: TaskFormData) => {
        try {
            setLoading(true);
            setError(null);

            const response: Task = await api.put(`/tasks/${taskId}`, task);

            return response;
        } catch (error) {
            handleTaskError(error, "updateTask");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Put ====== |

    //region | ====== Patch ====== |

    // Todo: Add Non-MVP patch methods.

    //endregion | ====== Patch ====== |

    //region | ====== Delete ====== |

    const deleteTask = async (taskId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response: Task = await api.delete(`/tasks/${taskId}`);

            return response;
        } catch (error) {
            handleTaskError(error, "deleteTask");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Delete ====== |

    return {
        tasks,
        loading,
        error,
        getAllTasks,
        getTaskById,
        createTask,
        updateTask,
        deleteTask,
    };
};

export default useTasks;
