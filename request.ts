"use server";

import axios from "./api";
import { CategoriesDTO } from "./types/categories";
import { CoursesDTO, LessonsDTO } from "./types/courses";

export const getCourses = async () => {
  try {
    return await axios.get<CoursesDTO[]>("/courses?search=");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message); // Now we are passing a string to Error constructor
    } else {
      // If it's not an Error, use a generic error message or convert error to a string
      throw new Error("An unknown error occurred");
    }
  }
};

export const createCourse = async (body: {
  title: string;
  description: string;
  category_id: string;
}) => {
  try {
    const { data, status } = await axios.post<{ id: string }>("/courses", body);

    return { data, status };
  } catch (error) {
    console.log("error", error);
  }
};

export const createService = async (body: {
  title: string;
  description: string;
  category_id: string;
}) => {
  try {
    return await axios.post<LessonsDTO>("/services", body);
  } catch (error) {
    console.log("error", error);
  }
};

export const createLesson = async (body: {
  title: string;
  content: string;
  course_id: string;
}) => {
  try {
    const { data, status } = await axios.post("/courses/lessons", body);

    return { data, status };
  } catch (error) {
    console.log("error", error);
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    return await axios.get<CategoriesDTO[]>("/courses/categories");
  } catch (error) {
    console.log(error);
  }
};

export const getCourseById = async (id: string) => {
  try {
    return await axios.get<CoursesDTO>(`/courses/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (body: {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  personal_info: string;
}) => {
  try {
    const { data, status } = await axios.post<{ id: string }>(
      "/users/sign-up",
      body
    );

    return { data, status };
  } catch (error) {
    console.log("error", error);
  }
};

export const uploadDocuments = async (id: string, body: FormData) => {
  try {
    const { data, status } = await axios.post<{ id: string }>(
      `/users/${id}/upload-documents`,
      body
    );

    return { data, status };
  } catch (error) {
    console.log("error in upload document", error);
  }
};
