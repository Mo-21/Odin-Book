import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
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

  getAllUser = () => {
    return axiosInstance.get<R>(this.endpoint).then((res) => res.data);
  };

  updateProfile = (data: T) => {
    return axiosInstance.put(this.endpoint, data).then((res) => res.data);
  };

  likePost = (data: T) => {
    return axiosInstance.put(this.endpoint, data).then((res) => res.data);
  };

  sharePost = (data: T) => {
    return axiosInstance.post<R>(this.endpoint, data).then((res) => res.data);
  };

  fetchFriends = () => {
    return axiosInstance.get<R>(this.endpoint).then((res) => res.data);
  };

  followUser = (data: T) => {
    return axiosInstance.put(this.endpoint, data).then((res) => res.data);
  };

  unFollowUser = (data: T) => {
    return axiosInstance.put(this.endpoint, data).then((res) => res.data);
  };

  commentPost = (data: T) => {
    return axiosInstance.post<R>(this.endpoint, data).then((res) => res.data);
  };

  deleteComment = (data: T) => {
    return axiosInstance
      .delete(this.endpoint, { data })
      .then((res) => res.data);
  };

  updatePost = (data: T) => {
    return axiosInstance.put(this.endpoint, data).then((res) => res.data);
  };

  deletePost = (data: T) => {
    return axiosInstance
      .delete(this.endpoint, { data })
      .then((res) => res.data);
  };

  getConversation = () => {
    return axiosInstance.get<R>(this.endpoint).then((res) => res.data);
  };

  getMessages = () => {
    return axiosInstance.get<R>(this.endpoint).then((res) => res.data);
  };

  sendMessage = (data: T) => {
    return axiosInstance.post<R>(this.endpoint, data).then((res) => res.data);
  };
}

export default ClientAPI;
