import axios from "axios";

export const httpClient = () => axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const executeRequestWithCache = async <T>(url: string) => {
    const cachedItem = sessionStorage.getItem(url);
    if(cachedItem != null){
        return JSON.parse(cachedItem);
    }

    const response = await httpClient().get<T>(url);
    
    if(response.status > 300){
        console.log("Loading data failed");
        return null;
    }

    sessionStorage.setItem(url, JSON.stringify(response.data));
    return response.data;
}