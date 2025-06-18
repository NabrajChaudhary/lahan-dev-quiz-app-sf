"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/core/components/ui/form";
import { Input } from "@/modules/core/components/ui/input";
import { Button } from "@/modules/core/components/ui/button";
import { Textarea } from "@/modules/core/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/core/components/ui/select";
import type { PostCategoryResponse } from "@/modules/dashboard/types/post-categories.type";
import { optionsGenerator } from "@/modules/core/utils/optionsGenerator";
import TextGroup from "@/modules/core/components/TextGroup";
import CustomTextEditor from "@/modules/core/components/TextEditor";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/modules/core/components/ImageUpload";
import { publicAxios } from "@/modules/core/utils/axios";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is Required and must be at least 2 sentences long.",
  }),
  extract: z.string().optional(),
  image: z.instanceof(File).optional(), // Change from string to File
  category: z.string({ message: "Category is required." }),
  tags: z.array(z.string()).optional(),
  content: z.string(),
});

const defaultValues = {
  title: "",
  extract: "",
  image: undefined, // Change from empty string to undefined
  category: "",
  tags: [],
  content: "",
};
const AddPostForm = ({ data }: { data: PostCategoryResponse }) => {
  const router = useRouter();
  const categoryOptions: Array<{ id: string; label: string }> =
    optionsGenerator(data.data);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      publicAxios
        .post("/posts/create", values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          toast.success(data.data.message);
        })
        .catch((data) => {
          toast.error(data.response.data.message);
        })
        .finally(() => {
          form.reset(defaultValues);
          router.push("/dashboard/posts");
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageChange = (file: File | null) => {
    form.setValue("image", file || undefined);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="text-4xl py-2 text-left font-medium">Add Post</h2>
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title of the post" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="extract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extract</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Extract of the post"
                      rows={5}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <CustomTextEditor
                      name="content"
                      value={field.value}
                      onChange={(content) => field.onChange(content)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4  relative ">
            <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:overflow-y-auto space-y-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Thumbnail</FormLabel>
                    <FormControl>
                      <ImageUpload
                        onImageChange={(file) => {
                          field.onChange(file);
                          handleImageChange(file);
                        }}
                        label=""
                        placeholder="Click to upload or drag and drop"
                        maxSize={5}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose Category</FormLabel>
                    <FormControl>
                      <div className="w-full">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoryOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <TextGroup
                        name="tags"
                        value={field.value || []}
                        placeholder="Enter a tag and press Tab"
                        onValueChange={(name, value) => field.onChange(value)}
                        onBlur={field.onBlur}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddPostForm;
