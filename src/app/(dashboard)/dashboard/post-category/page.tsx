import PostCategoryModule from "@/modules/dashboard/page/postCategory";
import { getAllPostCategories } from "@/modules/dashboard/services/post-categories.service";
import { cookies } from "next/headers";
import React from "react";

const PostCategoryPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");
  const getAllPostCategoriesData = await getAllPostCategories(token?.value);

  return <PostCategoryModule data={getAllPostCategoriesData} />;
};

export default PostCategoryPage;
