import PostModules from "@/modules/blogs/pages/PostModules";
import { getPosts } from "@/modules/blogs/services/posts.service";
import React from "react";

const BlogsPage = async () => {
  const getAllPostsData = await getPosts();
  console.log("🚀 ~ BlogsPage ~ getAllPostsData:", getAllPostsData);
  return <PostModules data={getAllPostsData} />;
};

export default BlogsPage;
