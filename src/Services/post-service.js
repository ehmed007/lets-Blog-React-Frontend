import { myAxios, privateAxios } from "./Helper";

export const createPost = async (data,userId,categoryId) => {
    const response = await privateAxios.post(`/api/v1/addPost/${userId}/${categoryId}`, data, {});
    return response.data;
}


export const uploadPostImage = async (image, postid) => {
    let formData = new FormData();
    formData.append("image",image)
    const response = await myAxios.post(`/api/v1/uploadPostImage/${postid}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};


export const loadAllPost = async () => {
    const response = await myAxios.get(`/api/v1/getAllPost`);
    return response.data;
}

export const loadAllPostByCategoryId = async (categoryId) => {
    const response = await myAxios.get(`/api/v1/getAllPostByCategory/${categoryId}`);
    return response.data;
}

export const loadOnePost = async (postId) => {
    const response = await myAxios.get(`/api/v1/getOnePost/${postId}`);
    return response.data;
}

export const deletePost = async (postId) => {
    const response = await privateAxios.delete(`/api/v1/deletePost/${postId}`);
    return response.data;
}

export const updatePost = async (data,postId,categoryId) => {
    const response = await privateAxios.post(`/api/v1/updatePost/${postId}/${categoryId}`, data);
    return response.data;
}
