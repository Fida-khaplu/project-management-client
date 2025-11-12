"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProjectById, getTaskByProjectId, createTask, getAllUser } from "@/utils/api";
import { useSelector } from "react-redux";

export default function ProjectPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const { user } = useSelector((state) => state.auth);

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        assignee: "", // will initialize with user._id later
        status: "open",
        priority: "medium",
        resolutionNotes: ""
    });
    const [taskError, setTaskError] = useState("");
    const [taskLoading, setTaskLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Initialize assignee to current user
    useEffect(() => {
        if (user?._id) {
            setNewTask(prev => ({ ...prev, assignee: user._id }));
        }
    }, [user]);

    // Fetch project
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const resp = await getProjectById(id);
                if (resp.success) setProject(resp.project);
                else setError("Failed to fetch project");
            } catch (err) {
                setError("Something went wrong");
                console.error(err);
            }
        };
        fetchProject();
    }, [id]);

    // Fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const resp = await getTaskByProjectId(id);
                if (resp.success) setTasks(resp.tasks);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [id]);

    // Fetch all users for dropdown
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const resp = await getAllUser();
                if (resp.success) setUsers(resp.users);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setTaskLoading(true);
        setTaskError("");

        try {
            const resp = await createTask({
                ...newTask,
                project: id,
                taskCreatedBy: user?._id,
                assignee: newTask.assignee || user?._id, // ensure assignee is not empty
            });

            if (resp.success) {
                setTasks(prev => [...prev, resp.task]);
                setNewTask({
                    title: "",
                    description: "",
                    assignee: user?._id, // reset assignee to current user
                    status: "open",
                    priority: "medium",
                    resolutionNotes: ""
                });
                setShowForm(false);
            } else {
                setTaskError(resp.message || "Failed to create task");
            }
        } catch (err) {
            setTaskError("Failed to create task");
            console.error(err);
        } finally {
            setTaskLoading(false);
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;
    if (!project) return <p className="p-4">Project not found.</p>;

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="max-w-4xl mx-auto text-black bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
                <p className="text-gray-700 mb-4">{project.description || "No description provided."}</p>

                <div className="mb-4">
                    <h2 className="font-semibold text-gray-800">Status:</h2>
                    <p>{project.status}</p>
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold text-gray-800">Owner:</h2>
                    <p>{project.owner?.username || project.owner?.email || project.owner}</p>
                </div>

                

                <div className="mb-4">
                    <h2 className="font-semibold text-gray-800">Members:</h2>
                    {project.members && project.members.length > 0 ? (

                        <ul className="list-disc list-inside">
                            {project.members.map((m, index) => (
                                <li key={index}>{m.username || m.email || m}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No members assigned.</p>
                    )}
                </div>

                <button
                    onClick={() => setShowForm(prev => !prev)}
                    className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    {showForm ? "Cancel" : "Create Task"}
                </button>

                {showForm && (
                    <div className="my-6 p-4 border rounded-lg bg-gray-50">
                        {taskError && <p className="text-red-500 mb-2">{taskError}</p>}
                        <form onSubmit={handleCreateTask} className="space-y-2">
                            <input
                                type="text"
                                name="title"
                                value={newTask.title}
                                onChange={handleInputChange}
                                placeholder="Task Title"
                                className="w-full p-2 border rounded"
                                required
                            />
                            <textarea
                                name="description"
                                value={newTask.description}
                                onChange={handleInputChange}
                                placeholder="Task Description"
                                className="w-full p-2 border rounded"
                            />
                            <select
                                name="assignee"
                                value={newTask.assignee}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Assignee</option>
                                {users.length > 0 ? (
                                    users.map(u => (
                                        <option key={u._id} value={u._id}>
                                            {u.username || u.email}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No users available</option>
                                )}
                            </select>
                            <select
                                name="priority"
                                value={newTask.priority}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <button
                                type="submit"
                                disabled={taskLoading}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                {taskLoading ? "Creating..." : "Create Task"}
                            </button>
                        </form>
                    </div>
                )}

                <div className="my-6">
                    <h2 className="text-xl text-black font-semibold mb-2">Tasks</h2>
                    {tasks.length > 0 ? (
                        <ul className="space-y-2">
                            {tasks.map(task => (
                                <li key={task._id} className="p-3 border rounded hover:bg-gray-50">
                                    <div className=" flex justify-between items-center mb-1">
                                        <span className="font-semibold w-4/6 text-black">{task?.title}</span>
                                        <div className="w-2/6 flex justify-between">
                                        <span className="text-gray-700 text-sm mr-4 bg-amber-400 p-2">
                                            {task.assignee?.username || task.assignee?.email || "Unassigned"}
                                        </span>
                                        <span
                                            className={`px-2 py-1 rounded text-white text-sm ${task.priority === "high"
                                                    ? "bg-red-500"
                                                    : task.priority === "medium"
                                                        ? "bg-yellow-500"
                                                        : "bg-green-500"
                                                }`}
                                        >
                                            {task.priority}
                                        </span>
                                        </div>
                                    </div>
                                    {task.description && (
                                        <p className="text-gray-600 text-sm">{task.description}</p>
                                    )}
                                    <p className="text-gray-500 text-sm">Status: {task.status}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tasks for this project.</p>
                    )}
                </div>

                <button
                    onClick={() => router.back()}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Back
                </button>
            </div>
        </div>
    );
}

