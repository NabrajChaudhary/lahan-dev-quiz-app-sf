"use client";
import FormBuilder from "@/modules/core/components/FormBuilder";
import React from "react";

import { useRouter } from "next/navigation";
import { publicAxios } from "@/modules/core/utils/axios";
import { toast } from "sonner";
import { quizFormData } from "./form-data";
import { formSchema } from "./quiz-schema";
import { useAuth } from "@/modules/auth/hooks/useAuth";

const QuizForm = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();

  const defaultValues = {
    title: "",
    description: "",
    numberOfQuestions: "",
    timeLimit: "",
    quizBy: user?.id || "",
  };

  const handleSubmit = (data: typeof defaultValues) => {
    console.log("🚀 ~ handleSubmit ~ data:", data);
    setLoading(true);
    try {
      publicAxios
        .post("/quiz/create", data)
        .then((data) => {
          toast.success(data.data.message);
          router.push("/dashboard/quiz");
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
        <h2 className="text-3xl my-6 font-bold">Create Quiz</h2>
      </div>
      <FormBuilder
        defaultValues={defaultValues}
        formBuilderData={quizFormData}
        schema={formSchema}
        formLayout="one-col"
        loading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default QuizForm;
