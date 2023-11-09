import { ProfileImagesEnum } from "./enuns";

export interface IPost {
  id: string;
  parentId: string | null;
  content: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    email: string;
    name: string;
    hash: string;
    hashedRT: string;
    createdAt: string;
    updatedAt: string;
  };
  likes: [
    {
      id: string;
      userId: string;
      createdAt: string;
      postId: string;
    }
  ];
  comments: [];
}

export type IUser = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  posts: IPost[];
  profile: {
    id: string;
    bio: string;
    userId: string;
    image: ProfileImagesEnum;
  };
  userFollowed: [];
  userFollowing: [];
  comments: [];
  likes: [];
};
