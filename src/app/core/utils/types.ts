export type LoginPayload = { username: string; password: string };
export type Tokens = { accessToken: string; refreshToken: string };
export type Message = { message: string };
export type Curriculum = {
  profileImage: string;
  firstname: string;
  lastname: string;
  credential: string;
  jobTitle: string;
  fields: Field[];
  contactInfo: ContactInfo[];
};

export type CurriculumCreatePayload = {
  firstname: string;
  lastname: string;
  jobTitle: string;
  credential: string;
  profileImage: string;
};

export type CurriculumUpdatePayload = {
  firstname?: string;
  lastname?: string;
  jobTitle?: string;
  credential?: string;
  profileImage?: string;
};

export type CurriculumPersonalData = {
  profileImage: string;
  firstname: string;
  lastname: string;
  credential: string;
  jobTitle: string;
};
export type CreateContactInfoPayload = {
  label: string;
  link: string;
  platform: string;
};

export type ContactInfo = {
  id: number;
  label: string;
  link: string;
  platform: string;
};

export type UpdateContactInfoPayload = {
  id: number;
  label?: string;
  link?: string;
  platform?: string;
};

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

export type Artigo = {
  authorId: string;
  author: Author;
  id: string;
  title: string;
  image: string;
  text: string;
  tags: Tag[];
  references: Reference[];
  createdAt: string;
  updatedAt: string;
};

export type ArtigoCreatePayload = {
  title: string;
  image: string;
  text: string;
  references?: Reference[];
  tagNames?: Tag[];
};

export type ArtigoUpdatePayload = {
  id: string;
  title?: string;
  image?: string;
  tags?: Tag[];
  text?: string;
  references?: Reference[];
};


export type Reference = {
  id: number;
  name: string;
};

export type ReferencePayload = {
  name: string;
};

export type Tag = {
  id: number;
  name: string;
};

export type TagPayload = {
  name: string;
};


export type Blog = {
  authorId: string;
  author: Author;
  id: string;
  title: string;
  image: string;
  tags: Tag[];
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type BlogCreatePayload = {
  title: string;
  image: string;
  text: string;
  tagNames?: TagPayload[];
};

export type BlogUpdatePayload = {
  id: string;
  title?: string;
  image?: string;
  tags?: Tag[];
  text?: string;
};

export type Material = {
  authorId: string;
  author: Author;
  id: string;
  title: string;
  image: string;
  file: string;
  tags: Tag[];
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type MaterialCreatePayload = {
  title: string;
  image: string;
  description: string;
  file: string;
  tags?: Tag[];
};

export type MaterialUpdatePayload = {
  id: string;
  title?: string;
  image?: string;
  description?: string;
  file?: string;
  tags?: Tag[];
};

export type Course = {
  authorId: string;
  author: Author;
  id: string;
  title: string;
  image: string;
  link: string;
  tags: Tag[];
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type CourseCreatePayload = {
  title: string;
  image: string;
  description: string;
  link: string;
  tags?: Tag[];
};

export type CourseUpdatePayload = {
  id: string;
  title?: string;
  image?: string;
  description?: string;
  link?: string;
  tags?: Tag[];
};

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

export type CreateFieldPayload = {
  title: string;
  items: string[];
};

export type Field = {
  id: number;
  title: string;
  items: string[];
};

export type UpdateFieldPayload = {
  id: number;
  title: string;
  items?: string[];
};

export type faq = {
  id: number;
  question: string;
  answer: string;
};

export type faqDisplay = {
  id: number;
  question: string;
  answer: string;
  open: boolean;
};

export type faqPayload = {
  question: string;
  answer: string;
};
