import { privateAxios } from "./Helper";



export const doComment = async (data,postId,userId) => {
    const response = await privateAxios.post(`/api/v1/addComment/${postId}/${userId}`,data);
    return response.data;
}



export const deleteComment = async (commentId) => {
    const response = await privateAxios.delete(`/api/v1/deleteComment/${commentId}`);
    return response.data;
}