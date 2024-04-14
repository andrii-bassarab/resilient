"use client";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryDTO } from "@/types/courses";
import { createCourse } from "@/request";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required",
    })
    .min(4, {
      message: "Title is too short",
    }),
  description: z.string().min(10, "Description is too short"),
  category: z
    .object({
      id: z.string().min(1, { message: "Category ID is required" }),
      name: z.string().min(1, { message: "Category name is required" }),
    })
    .superRefine((category, ctx) => {
      if (!category.id || !category.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Category is required",
        });
      }
    }),
  productType: z.enum(["service", "courses"]),
});

export const CreateResourceForm = ({
  coursesCategories,
}: {
  coursesCategories: CategoryDTO[];
}) => {
  const router = useRouter();

  const categoryDropdown =
    (coursesCategories || [])?.filter(({ name }) => name !== "All") || [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productType: "courses",
      category: {
        id: "",
        name: "",
      },
      title: "",
      description: "",
    },
  });

  async function onSubmit({
    title,
    description,
    category,
    productType,
  }: z.infer<typeof formSchema>) {
    const res = await createCourse({
      title,
      description,
      category_id: category.id,
    });

    if (res?.status === 201 && res.data.id) {
      router.push(`/create-lesson/${res.data.id}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl w-full">
        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Product Type</FormLabel>
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  <div className="flex items-center space-x-2">
                    <Label className="cursor-pointer flex flex-row justify-center items-center gap-2">
                      <RadioGroupItem value="courses" className="h-5 w-5" />
                      Courses
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label className="cursor-pointer flex flex-row justify-center items-center gap-2">
                      <RadioGroupItem value="service" className="h-5 w-5" />
                      Service
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormDescription>Choose product type to create</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
                This is your public display title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>This is your description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Category</FormLabel>
              <FormControl>
                <Select
                  value={field.value?.name}
                  onValueChange={(selectedName) => {
                    const selectedCategory = categoryDropdown.find(
                      (category) => category.name === selectedName
                    );

                    if (selectedCategory) {
                      field.onChange(selectedCategory);
                    }
                  }}
                >
                  <SelectTrigger className="w-60">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categoryDropdown.map(({ id, name }) => (
                        <SelectItem key={id} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is your description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-8">
          Submit
        </Button>
      </form>
    </Form>
  );
};
