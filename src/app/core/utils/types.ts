export type LoginPayload = { username: string; password: string };
export type Tokens = { accessToken: string; refreshToken: string };
export type Message = { message: string };
export type Curriculum = {
  profileImage: string;
  firstname: string;
  lastname: string;
  credential: string;
  jobTitle: string;
  fields: Field[]
  contactInfo: ContactInfo[]
};

export type CurriculumCreatePayload = {
  firstname: string,
  lastname: string,
  jobTitle: string,
  credential: string,
  profileImage: string;
}

export type CurriculumUpdatePayload = {
  firstname?: string,
  lastname?: string,
  jobTitle?: string,
  credential?: string,
  profileImage?: string;
}


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
  platform: string
}

export type ContactInfo = {
  id: number;
  label: string;
  link: string;
  platform: string
};

export type UpdateContactInfoPayload = {
  id: number;
  label?: string;
  link?: string;
  platform?: string
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

export type CreateFieldPayload = {
  title: string;
  items: string[];
}

export type Field = {
  id: number;
  title: string;
  items: string[];
}

export type UpdateFieldPayload = {
  id: number;
  title: string;
  items?: string[];
}

export type faq = {
  id: number
  question: string;
  answer: string
}

export type faqDisplay = {
  id: number
  question: string;
  answer: string
  open: boolean
}

export type faqPayload = {
  question: string;
  answer: string
}