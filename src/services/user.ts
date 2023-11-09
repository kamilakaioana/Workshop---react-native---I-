import api from "./api";

export interface IEditUserParams {
  name?: string;
  bio?: string;
  image?: string;
}

class UserService {
  async editUser({ bio, image, name }: IEditUserParams) {
    return await api.patch("/user/self", {
      name,
      bio,
      image,
    });
  }

  async getUserSelf() {
    return await api.get("/user/self");
  }
}

export const userService = new UserService();
