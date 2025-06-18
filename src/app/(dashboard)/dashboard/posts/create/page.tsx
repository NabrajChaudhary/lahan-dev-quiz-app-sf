import AddPostForm from "@/modules/dashboard/page/posts/AddPostForm";
import { getPostCategories } from "@/modules/dashboard/services/post-categories.service";
import React from "react";

const CreatePost = async () => {
  const getPostCategoriesData = await getPostCategories();

  return <AddPostForm data={getPostCategoriesData} />;
};

export default CreatePost;
