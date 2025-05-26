export type LoginPayload = { username: string; password: string };
export type Tokens = { accessToken: string; refreshToken: string };
export type RegisterPayload = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};
export type User = {
  id: string;
  profileImage: string;
  firstname: string;
  lastname: string;
  username: string;
  role: string;
};
type Author = {
  firstname: string;
  lastname: string;
  profileImage: string;
};
export type Blog = {
  authorId: string;
  author: Author;
  id: string;
  title: string;
  image: string;
  text: string;
  references: string[];
  createdAt: string;
  updatedAt: string;
};
export type Artigo = {
  authorId: string;
  author: Author;
  id: string;
  title: string;
  image: string;
  text: string;
  references: string[];
  createdAt: string;
  updatedAt: string;
};
export type Post = Blog | Artigo;
