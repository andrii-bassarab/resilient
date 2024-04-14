import { Filters } from "@/components/custom";
import { getCategories, getCourses } from "@/request";
import { CourseCard } from "@/components/custom/course-card";

interface HomeProps {
  searchParams?: { categoryIds: string };
}
export default async function Home({ searchParams }: HomeProps) {
  const courses = await getCourses();

  const categories = await getCategories();

  return (
    <>
      <Filters categories={categories?.data} />

      <div className="flex flex-col gap-2 w-3/4">
        {courses?.data?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}
