import { CreateLesson } from "@/components/custom/create-lesson";
import { redirect } from "next/navigation";

export default function CreateLessonPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    redirect("/");
  }

  return <CreateLesson courseId={params.id} />;
}
