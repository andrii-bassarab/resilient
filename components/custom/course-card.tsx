'use client';

import { useRouter } from 'next/navigation';
import * as NProgress from 'nprogress';
import { CoursesDTO } from '@/types/courses';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTheme } from 'next-themes';

interface CourseCardProps {
  course: CoursesDTO;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const { theme } = useTheme();
  const router = useRouter();

  const onNavigate = () => {
    NProgress.start()
    router.push(`/courses/${course.id}`)
  };

  return (
    <Card className='p-4 w-full cursor-pointer hover:-translate-y-4 transition-transform' onClick={onNavigate}>
      <CardContent className='flex flex-col gap-3 w-72'>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardContent>

      <Accordion type='single' collapsible className='w-full px-6'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Show Lessons</AccordionTrigger>

          {course.lessons?.map((lesson) => (
            <AccordionContent key={lesson.id}>{lesson.title}</AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>

      {course.category_name && (
        <CardFooter className='flex flex-col items-start gap-2 py-3'>
          <span>Categories</span>

          <div className='flex gap-4'>
            <div className='border p-2 px-6 rounded-full'>
              {course.category_name}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
