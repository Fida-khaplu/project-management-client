
"use client";
import AddSiteLinkModal from "@/components/modalComp";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProject, getAllProject, updateProject } from "@/utils/api";
import AddProjectModal from "@/components/modalComp";

export default function Dashboard() {
    const [allProjects, setAllProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    //   useEffect(() => {
    //     if (!user) {
    //       router.push("/login"); // not logged in
    //     } else if (user.role !== "admin") {
    //       router.push("/"); 
    //     }
    //   }, [user, router]);

    //   if (!user || user.role !== "admin") return null;

    // Fetch links on load
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const resp = await getAllProject();
                console.log(resp, "=====res");

                setAllProjects(resp.projects);
            } catch (error) {
                console.error("Failed to fetch project", error);
            }
        };
        fetchProject();
    }, []);



    const handleDeleteProject = async (id) => {
        try {
            const resp = await deleteProject(id);
        } catch (error) {
            console.error("Failed to delete link", error);
        }
    }

    const handleViewProject = (id) => {
    router.push(`/project/${id}`);
};


    return (
        <div className="min-h-screen block  bg-gray-100">
            {/* Sidebar */}
            <div className="w-full flex items-center justify-between bg-white shadow-md p-4">
                <h2 className="text-xl text-black font-bold mb-6">Analytics Dashboard</h2>
                <div className="w-64 space-y-4">
                    <li>

                        <AddProjectModal />
                    </li>

                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className=" block lg:flex justify-between text-black items-center mb-6">
                    <h1 className="text-2xl font-semibold">Projects</h1>

                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 w-3/12 text-black">Project Name</th>
                                <th className="p-3 w-3/12 text-black">Status</th>
                                <th className="p-3 w-3/12 text-black">Members</th>
                                <th className="p-3 w-3/12 text-black">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProjects.length > 0 ? (
                                allProjects.map((item) => (
                                    <tr key={item._id} className="border-b">
                                        <td className="p-3 text-black">{item.name}</td>
                                        <td className="p-3 text-black">{item.status}</td>
                                        <td className="p-3 text-black">
                                            {item.members && item.members.length > 0
                                                ? item.members.map((m) => m.username || m.email || m ).join(", ")
                                                : "No members"}
                                        </td>
                                        

                                        <td className="p-3 space-x-2">
                                           
                                            <button onClick={() => handleDeleteProject(item._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                                                Delete
                                            </button>
                                            <button onClick={() => handleViewProject(item._id)} className="bg-green-500 text-white px-3 py-1 rounded-lg">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-3 text-center">
                                        No Project found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Add Site Modal */}
            {isModalOpen && (
                <AddProjectModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
}
