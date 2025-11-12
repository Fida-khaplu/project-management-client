"use client";
import { useState, useEffect } from "react";
import { createProject, getAllUser } from "@/utils/api";
import { useSelector } from "react-redux";

export default function AddProjectModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState([]); // for members list
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        owner: "",
        members: [],
        status: "active", // default
        description: "",
    });

    const { user } = useSelector((state) => state.auth);
    console.log("user id ", user);


    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const resp = await getAllUser();
                setUsers(resp.users || []);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            }
        };
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value, multiple, options } = e.target;

        if (name === "members" && multiple) {
            const selectedValues = Array.from(options)
                .filter((option) => option.selected)
                .map((option) => option.value);
            setFormData((prev) => ({ ...prev, members: selectedValues }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
 
    const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        // Send the formData along with owner ID from Redux
        const dataToSubmit = {
            ...formData,
            owner: user?._id, // assign owner ID here
        };

        const resp = await createProject(dataToSubmit);

        if (resp.success) {
            setIsOpen(false);
            setError("");
        } else {
            setError("Failed to create project");
        }
    } catch (error) {
        console.error("Error creating project:", error);
        setError("Something went wrong. Please try again!");
    }
};


    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Add Project
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/80">
                    <div className="relative p-4 w-full max-w-md">
                        <div className="relative bg-white rounded-lg shadow">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">Add Project</h3>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-4">
                                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Project Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Project Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Owner</label>
                                        <input
                                            type="text"
                                            name="owner"
                                            value={user?.username || user?.email || ""}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Members</label>
                                        <div className="mt-1 flex flex-col gap-1 max-h-20 overflow-y-auto border rounded-md p-2">
                                            {users.map((user) => (
                                                <label key={user._id} className="flex items-center gap-2 text-gray-700">
                                                    <input
                                                        type="checkbox"
                                                        value={user._id}
                                                        checked={formData.members.includes(user._id)}
                                                        onChange={(e) => {
                                                            const id = e.target.value;
                                                            setFormData((prev) => {
                                                                if (prev.members.includes(id)) {
                                                                    return {
                                                                        ...prev,
                                                                        members: prev.members.filter((m) => m !== id),
                                                                    };
                                                                } else {
                                                                    return { ...prev, members: [...prev.members, id] };
                                                                }
                                                            });
                                                        }}
                                                        className="accent-blue-600"
                                                    />
                                                    {user.username || user.email}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Status</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                                        >
                                            <option value="active">Active</option>
                                            <option value="pending">Pending</option>
                                            <option value="on-hold">On Hold</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                                            rows={4}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Add Project
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
