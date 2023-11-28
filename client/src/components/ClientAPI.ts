import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

class ClientAPI<T, R> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  login = (data: T) => {
    return axiosInstance.post<R>(this.endpoint, data).then((res) => res.data);
  };

  getTimeline = () => {
    return axiosInstance.get<R>(this.endpoint).then((res) => res.data);
  };

  getUser = () => {
    return axiosInstance.get<R>(this.endpoint).then((res) => res.data);
  };
}

export default ClientAPI;
