import axios from "@/api";
import { CreateResourceForm } from "@/components/custom";
import { CategoryDTO } from "@/types/courses";

export default async function CreateResource() {
  const { data: coursesCategories } = await axios.get<CategoryDTO[]>(
    "/courses/categories"
  );

  return <CreateResourceForm coursesCategories={coursesCategories} />;
}
