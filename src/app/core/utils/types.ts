export type LoginPayload = { username: string; password: string };
export type Tokens = { accessToken: string; refreshToken: string };
export type Message = { message: string };
export type Curriculum = {
  personal_data: {
    profileImage: string;
    firstName: string;
    lastName:string;
    credential: string;
    jobTitle: string;
  }
  contact_info: CurriculumContactInfo
  teaching_info: CurriculumTeachingInfo
  experience_info: CurriculumExperienceInfo
  academic_info: CurriculumAcademicInfo
};
export type CurriculumContactInfo = { title: string; items: string[] };
export type CurriculumAcademicInfo = { title: string; items: string[] };
export type CurriculumExperienceInfo = { title: string; items: string[] };
export type CurriculumTeachingInfo = { title: string; items: string[] };
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
