import { myAxios, privateAxios } from "./Helper";

export const signup = async (user) => {
    const response = await myAxios.post("/auth/register", user);
    return response.data;
};

export const uploadUserImage = async (image, userid) => {
    let formData = new FormData();
    formData.append("image",image)
    const response = await myAxios.post(`/auth/uploadUserImage/${userid}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const usernameExist = async (username) => {
    const response = await myAxios.post(`/auth/usernameExist/${username}`);
    return response.data;
};

export const login = async (data) => {
    const response = await myAxios.post("/auth/login", data);
    return response.data;
}

export const getOneUser = async (userId) => {
    const response = await myAxios.get(`/api/v1/getOneUser/${userId}`);
    return response.data;
}


