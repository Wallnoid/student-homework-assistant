import { UserMeResponse } from "../models/user.model";
import interceptor from "./interceptor";


export const userMe = async (): Promise<UserMeResponse> => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await interceptor.get(`${API_URL}/users/me`);
    return response.data;
}