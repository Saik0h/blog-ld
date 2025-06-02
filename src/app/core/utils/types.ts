export type LoginPayload = { username: string; password: string };
export type Tokens = { accessToken: string; refreshToken: string };
export type Message = { message: string };
export type Curriculum = {
  profileImage: string;
  firstname: string;
  lastname: string;
  credential: string;
  jobTitle: string;
  contact_field: CurriculumContactInfo;
  teaching_field: CurriculumTeachingInfo;
  experiences_field: CurriculumExperienceInfo;
  academic_field: CurriculumAcademicInfo;
};
export type CurriculumPersonalData = {
  profileImage: string;
  firstname: string;
  lastname: string;
  credential: string;
  jobTitle: string;
};
export type CurriculumContactInfo = { title: string; items: {
  label: string;
  link: string;
  platform: string
}[]};
export type CurriculumAcademicInfo = { title: string; items: {id: number, description: string}[] };
export type CurriculumExperienceInfo = { title: string; items: {id: number, description: string}[] };
export type CurriculumTeachingInfo = { title: string; items: {id: number, description: string}[] };
export type CurriculumDataUpdate = any;
export type CurriculumBodyCreate = any;
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

export type MailPayload = {
  name: string;
  email: string;
  message: string;
  subject?: string;
};

export type Mail = {
  id: string;
  name: string;
  email: string;
  message: string;
  subject: string;
  createdAt: string;
  read: boolean;
};

export type PostPayload = {
  category: string;
  title: string;
  text: string;
  references?: string[];
  image?: string;
};
