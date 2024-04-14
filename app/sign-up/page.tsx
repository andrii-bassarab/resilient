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
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Box } from "@/components/ui/box";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { registerUser, uploadDocuments } from "@/request";
import Link from "next/link";

const formSchema = z.object({
  firstName: z.string().min(4, {
    message: "FirstName is too short",
  }),
  lastName: z.string().min(4, {
    message: "LastName is too short",
  }),
  description: z.string().min(8, {
    message: "Description is too short",
  }),
  password: z.string().min(6, {
    message: "Password too short",
  }),
  email: z.string().email("Email is invalid"),
});

export default function SignUpPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [showPendingPage, setShowPendingPage] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      description: "",
      password: "",
      email: "",
    },
  });

  async function onSubmit({
    firstName,
    lastName,
    password,
    email,
    description,
  }: z.infer<typeof formSchema>) {
    const res = await registerUser({
      lastName,
      firstName,
      email,
      personal_info: description,
      password,
    });

    if (!res?.data) {
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append(`documents`, file);
    });

    const resUpload = await uploadDocuments(res?.data.id, formData);

    if (resUpload?.status !== 201) {
      return;
    }

    localStorage.setItem("userName", `${firstName} ${lastName}`);

    setShowPendingPage(true);
  }

  return (
    <>
      {showPendingPage ? (
        <Box className="self-center text-center max-w-lg mt-[20%]">
          <Typography variant="h3">Thank you!</Typography>
          <Typography>
            Our moderators will check your documents and grant access to the
            platform after successful data verification
          </Typography>
        </Box>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-4xl w-full pt-3"
          >
            <Typography variant="h3" className="mx-auto w-max mb-4">
              Create account
            </Typography>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
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
                    <Textarea
                      className="h-20 resize-none"
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Tell us about your story</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Input
              type="file"
              multiple
              accept="image/*"
              className="py-2 leading-none"
              onChange={(e) =>
                // @ts-ignore
                e.target.files && setFiles([...e.target.files] || [])
              }
            />
            <Typography className="text-sm mt-3 px-4">
              Please upload the documents that confirm that you are a person
              affected by the war (document of an internally displaced person,
              passport)
            </Typography>
            <Button type="submit" className="mt-8">
              Submit
            </Button>
            <Typography className="mt-6 px-4 mx-auto w-max">
              Already have account?{" "}
              <Link href="/sign-in" className="text-primary">
                Sign In
              </Link>
            </Typography>
          </form>
        </Form>
      )}
    </>
  );
}
