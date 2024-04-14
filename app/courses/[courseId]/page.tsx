import { getCourseById } from '@/request';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface CourseProps {
  params: {
    courseId: string;
  };
}

const Course = async ({ params }: CourseProps) => {
  const course = await getCourseById(params.courseId);

  return (
    <div className='flex flex-col items-center w-full'>
      <h1 className='text-3xl'>{course?.data?.title}</h1>
      <span className='text-secondary-foreground'>
        {course?.data?.description}
      </span>

      <Accordion type="single" collapsible className='flex flex-col mt-16 w-full border rounded-lg items-start justify-start p-3rrrr'>
        {course?.data.lessons.map((lesson) => (
          <AccordionItem value={lesson.id} key={lesson.id} className='w-full px-4'>
            <AccordionTrigger>{lesson.title}</AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Course;
