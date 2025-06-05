"use client";
import FormBuilder from "@/modules/core/components/FormBuilder";
import React from "react";
import { categoryFormData } from "./form-data";
import { formSchema } from "./category-schema";
import { useRouter } from "next/navigation";
import { publicAxios } from "@/modules/core/utils/axios";
import { toast } from "sonner";

export const defaultValues = {
  title: "",
  category_slug: "",
  description: "",
};

const CategoryForm = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (data: typeof defaultValues) => {
    setLoading(true);
    try {
      publicAxios
        .post("/categories/create", data)
        .then((data) => {
          toast.success(data.data.message);
          router.push("/dashboard/category");
          setLoading(false);
        })
        .catch((data) => {
          toast.error(data.response.data.message);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-6/6">
      <div className="flex items-center">
        <h2 className="text-3xl my-6 font-bold">Create Category</h2>
      </div>
      <FormBuilder
        defaultValues={defaultValues}
        formBuilderData={categoryFormData}
        schema={formSchema}
        formLayout="one-col"
        loading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CategoryForm;
