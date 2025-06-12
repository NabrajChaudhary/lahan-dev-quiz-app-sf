"use client";
import FormBuilder from "@/modules/core/components/FormBuilder";
import { useRouter } from "next/navigation";
import React from "react";
import { feedbackFormData } from "./form-data";
import { formSchema } from "./feedback-form-schema";
import { publicAxios } from "@/modules/core/utils/axios";
import { toast } from "sonner";
import { Button } from "@/modules/core/components/ui/button";
import Link from "next/link";

export const defaultValues = {
  title: "",
  description: "",
  rating: 0,
};
const FeedbackForm = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (data: typeof defaultValues) => {
    console.log("🚀 ~ handleSubmit ~ data:", data);
    setLoading(true);
    try {
      publicAxios
        .post("/feedback/create", data)
        .then((data) => {
          toast.success(data.data.message);
          router.push("/quiz");
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
    <div className="mx-auto flex  justify-center min-h-screen h-full">
      <div className="w-11/12 lg:w-5/12">
        <Button className="mt-2" variant="destructive">
          <Link href="/quiz">Go back to quiz</Link>
        </Button>
        <h2 className="text-4xl my-6 font-bold text-center">Feedback Form</h2>
        <FormBuilder
          defaultValues={defaultValues}
          formBuilderData={feedbackFormData}
          schema={formSchema}
          formLayout="one-col"
          loading={loading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default FeedbackForm;
