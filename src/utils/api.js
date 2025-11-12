import axios from "axios";


const BASE_URL = "http://localhost:4000"

export const signIn = async (data)=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/signin/`, data,{
      withCredentials: true,  
    });
        return response.data;
    } catch (error) {
        console.error("Error Adding User", error);
        throw error;
    }
}


export const signUp = async (data)=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/signup/`, data , {
      withCredentials: true,   
    });
        return response.data;
    } catch (error) {
        console.error("Error Adding User", error);
        throw error;
    }
}



export const createProject = async (data)=>{
    try {
        console.log("data is" , data);
        
        const response = await axios.post(`${BASE_URL}/api/project/`, data, {
      withCredentials: true,   
    });
        console.log("response link ===", response);
        
        return response.data;
        
    } catch (error) {
        console.error("Error failed to add link", error);
        throw error;
    }
}


export const getAllProject = async ()=>{
    try {
        const resp = await axios.get(`${BASE_URL}/api/project/`);
        return resp.data;
    } catch (error) {
        console.error("Error getting", error);
        throw error;
    }
}

export const getProjectById = async (id) => {
    try {
        const resp = await axios.get(`${BASE_URL}/api/project/${id}`);
        return resp.data;
    } catch (error) {
        console.error("Error fetching project by ID:", error);
        throw error;
    }
};


export const updateProject = async (projectId, updatedData) => {
  try {
    const resp = await axios.put(`${BASE_URL}/api/project/${projectId}`, updatedData);
    return resp.data; 
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};


export const deleteProject = async (id) => {
  try {
    const resp = await axios.delete(`${BASE_URL}/api/project/${id}`, {
      withCredentials: true, 
    });
    return resp.data;
  } catch (error) {
    console.error("Error deleting Project", error.response?.data || error);
    throw error;
  }
};



export const getAllUser = async ()=>{
    try {
        const resp = await axios.get(`${BASE_URL}/api/user/`);
        return resp.data;
    } catch (error) {
        console.error("Error getting", error);
        throw error;
    }
}


export const createTask = async (data) => {
    try {
        const resp = await axios.post(`${BASE_URL}/api/task/`, data);
        return resp.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

export const getTaskById = async (id) => {
    try {
        const resp = await axios.get(`${BASE_URL}/api/task/${id}`);
        return resp.data;
    } catch (error) {
        console.error("Error fetching task by ID:", error);
        throw error;
    }
};


export const getTaskByProjectId = async (projectId) => {
    try {
        const resp = await axios.get(`${BASE_URL}/api/task/project/${projectId}`);
        return resp.data; // expects { success: true, tasks: [...] }
    } catch (error) {
        console.error("Error getting tasks for project", error);
        throw error;
    }
};




