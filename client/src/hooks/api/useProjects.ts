import { useState } from "react";
import type { ProjectFormData } from "@/types/forms/project/ProjectFormData";
import type { Project } from "@/types/models/Project";
import useQuery from "@app/providers/Query/useQuery";
import { ProjectRequestError } from "@errors/RequestErrors";

const useProjects = () => {
    const api = useQuery();

    // States
    const [projects, setProjects] = useState<Project[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const handleProjectError = (error: any, method: string) => {
        const errorAsError = error as Error;
        const err = new ProjectRequestError(
            method,
            errorAsError.message,
            errorAsError,
        );
        setError(err);
        throw err;
    };

    //region | ====== Get ====== |

    const getAllProjects = async () => {
        try {
            setLoading(true);
            setError(null);

            const response: Project[] = await api.get("/projects");

            setProjects(response);

            return response;
        } catch (error) {
            handleProjectError(error, "getAllProjects");
        } finally {
            setLoading(false);
        }
    };

    const getAllPublicProjects = async () => {
        try {
            setLoading(true);
            setError(null);

            const response: Project[] = await api.get("/projects/public");
            setProjects(response);

            return response;
        } catch (error) {
            handleProjectError(error, "getAllPublicProjects");
        } finally {
            setLoading(false);
        }
    };

    const getMyProjects = async () => {
        try {
            setLoading(true);
            setError(null);

            const response: Project[] = await api.get("/projects/my-projects");
            setProjects(response);

            return response;
        } catch (error) {
            handleProjectError(error, "getMyProjects");
        } finally {
            setLoading(false);
        }
    };

    const getProjectByUserId = async (userId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response: Project[] = await api.get(
                `/projects/user/${userId}`,
            );
            setProjects(response);

            return response;
        } catch (error) {
            handleProjectError(error, "getProjectByUserId");
        } finally {
            setLoading(false);
        }
    };

    const getProjectById = async (projectId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response: Project = await api.get(`/projects/${projectId}`);
            return response;
        } catch (error) {
            handleProjectError(error, "getProjectById");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Get ====== |

    //region | ====== Post ====== |

    const createProject = async (project: ProjectFormData) => {
        try {
            setLoading(true);
            setError(null);

            const response: Project = await api.post("/projects", project);
            return response;
        } catch (error) {
            handleProjectError(error, "createProject");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Post ====== |

    //region | ====== Put ====== |

    const updateProject = async (
        projectId: string,
        project: ProjectFormData,
    ) => {
        try {
            setLoading(true);
            setError(null);

            const response: Project = await api.put(
                `/projects/${projectId}`,
                project,
            );
            return response;
        } catch (error) {
            handleProjectError(error, "updateProject");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Put ====== |

    //region | ====== Patch ====== |

    const attachTaskToProject = async (projectId: string, taskId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response: Project = await api.patch(
                `/projects/${projectId}/attach-task/${taskId}`,
            );

            return response;
        } catch (error) {
            handleProjectError(error, "attachTaskToProject");
        } finally {
            setLoading(false);
        }
    };

    const detachTaskFromProject = async (projectId: string, taskId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response: Project = await api.patch(
                `/projects/${projectId}/detach-task/${taskId}`,
            );
            return response;
        } catch (error) {
            handleProjectError(error, "detachTaskFromProject");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Patch ====== |

    //region | ====== Delete ====== |

    const deleteProject = async (projectId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response: Project = await api.delete(
                `/projects/${projectId}`,
            );
            return response;
        } catch (error) {
            handleProjectError(error, "deleteProject");
        } finally {
            setLoading(false);
        }
    };

    //endregion | ====== Delete ====== |

    return {
        projects,
        loading,
        error,
        getAllProjects,
        getAllPublicProjects,
        getMyProjects,
        getProjectByUserId,
        getProjectById,
        createProject,
        updateProject,
        attachTaskToProject,
        detachTaskFromProject,
        deleteProject,
    };
};

export default useProjects;
