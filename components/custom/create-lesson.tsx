"use client";

import { Box } from "@/components/ui/box";
import { Typography } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { CmsEditor } from "@/components/custom";
import { Input } from "@/components/ui/input";
import { createLesson } from "@/request";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title is too short",
  }),
});

export const CreateLesson = ({ courseId }: { courseId: string }) => {
  const editorRef = useRef<Editor>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit({ title }: z.infer<typeof formSchema>) {
    if (editorRef.current) {
      // @ts-ignore
      const content = editorRef.current.getContent();

      const res = await createLesson({
        title,
        course_id: courseId,
        content,
      });

      if (res?.status === 201) {
        router.push("/courses");
        router.refresh();
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl w-full">
        <Typography variant="h3">Create Lesson</Typography>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>
                This is your lesson&apos;s title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <CmsEditor ref={editorRef} />
        <Button type="submit" className="mt-8">
          Submit
        </Button>
      </form>
    </Form>
  );
};
