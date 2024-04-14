export interface CoursesDTO {
  id: string;
  title: string;
  description: string;
  category_name: string;
  lessons: LessonsDTO[];
}

export interface LessonsDTO {
  id: string;
  title: string;
  content: string;
  course_id: string;
}

export interface CategoryDTO {
  id: string;
  name: string;
}

interface Author {
  name: string;
  personal_info: string;
  age: number;
}

export interface ServiceDTO {
  id: string;
  title: string;
  description: string;
  author_id: string;
  author: Author;
}
