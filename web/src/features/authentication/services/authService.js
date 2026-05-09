import api from "../../shared/api/api";

export const loginUser = async (data) => {
    return api.post("/login", data);
};