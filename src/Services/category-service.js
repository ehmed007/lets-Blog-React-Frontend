
import { myAxios, privateAxios } from "./Helper";

export const loadAllCategories = async () => {
    const response = await myAxios.get("/api/v1/getAllCategory");
    return response.data;
}
