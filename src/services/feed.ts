import { AxiosPromise } from "axios";
import api from "./api";
import { IPost } from "../interfaces/interfaces";

class FeedService {
  async getFeed(): AxiosPromise<IPost[]> {
    return await api.get("/feed/public");
  }

  async getPostsByUserId(userId: string) {
    return await api.get(`/post/user/${userId}`);
  }

  async likePost(postId: string) {
    return await api.post(`/post/like/${postId}`);
  }

  async createPost(content: string) {
    return await api.post("/post", {
      content,
    });
  }
}

export const feedService = new FeedService();
