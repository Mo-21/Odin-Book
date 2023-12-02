import axios from "axios";

const axiosInstanceLogin = axios.create({
  baseURL: "/api/auth",
});

const axiosInstanceUsers = axios.create({
  baseURL: "/api/users",
});

const axiosInstancePosts = axios.create({
  baseURL: "/api/posts",
});

const axiosInstanceComments = axios.create({
  baseURL: "/api/comments",
});

const axiosInstanceConversations = axios.create({
  baseURL: "/api/conversations",
});

const axiosInstanceMessages = axios.create({
  baseURL: "/api/messages",
});

class ClientAPI<T, R> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  login = (data: T) => {
    return axiosInstanceLogin
      .post<R>(this.endpoint, data)
      .then((res) => res.data);
  };

  getTimeline = () => {
    return axiosInstancePosts.get<R>(this.endpoint).then((res) => res.data);
  };

  getUser = () => {
    return axiosInstanceUsers.get<R>(this.endpoint).then((res) => res.data);
  };

  getAllUser = () => {
    return axiosInstanceUsers.get<R>(this.endpoint).then((res) => res.data);
  };

  updateProfile = (data: T) => {
    return axiosInstanceUsers.put(this.endpoint, data).then((res) => res.data);
  };

  likePost = (data: T) => {
    return axiosInstancePosts.put(this.endpoint, data).then((res) => res.data);
  };

  sharePost = (data: T) => {
    return axiosInstancePosts
      .post<R>(this.endpoint, data)
      .then((res) => res.data);
  };

  fetchFriends = () => {
    return axiosInstanceUsers.get<R>(this.endpoint).then((res) => res.data);
  };

  followUser = (data: T) => {
    return axiosInstanceUsers.put(this.endpoint, data).then((res) => res.data);
  };

  unFollowUser = (data: T) => {
    return axiosInstanceUsers.put(this.endpoint, data).then((res) => res.data);
  };

  commentPost = (data: T) => {
    return axiosInstanceComments
      .post<R>(this.endpoint, data)
      .then((res) => res.data);
  };

  deleteComment = (data: T) => {
    return axiosInstanceComments
      .delete(this.endpoint, { data })
      .then((res) => res.data);
  };

  updatePost = (data: T) => {
    return axiosInstancePosts.put(this.endpoint, data).then((res) => res.data);
  };

  deletePost = (data: T) => {
    return axiosInstancePosts
      .delete(this.endpoint, { data })
      .then((res) => res.data);
  };

  getConversation = () => {
    return axiosInstanceConversations
      .get<R>(this.endpoint)
      .then((res) => res.data);
  };

  getMessages = () => {
    return axiosInstanceMessages.get<R>(this.endpoint).then((res) => res.data);
  };

  sendMessage = (data: T) => {
    return axiosInstanceMessages
      .post<R>(this.endpoint, data)
      .then((res) => res.data);
  };
}

export default ClientAPI;
