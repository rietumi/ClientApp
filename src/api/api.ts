import axios, { AxiosResponse, AxiosError } from 'axios';

const API = axios.create({
  baseURL: `${process.env.PUBLIC_URL}/api`,
});

export interface Payload<T> {
    onSuccess?: (response: AxiosResponse<unknown>) => void;
    onError?: (error: AxiosError<unknown>) => void;
    data: T;
}  

API.interceptors.request.use(req => {
  req.headers = { ...req.headers };
  return req;
});

export default API;