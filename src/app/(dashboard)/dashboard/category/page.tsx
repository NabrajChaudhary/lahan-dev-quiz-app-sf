import CategoriesModule from "@/modules/dashboard/page/categories";
import { getAllQuizCategories } from "@/modules/dashboard/services/quiz-categories.services";

import { cookies } from "next/headers";
import React, { Suspense } from "react";

const CategoryPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  // const getAllCategories = await getAllQuizCategories(token?.value);
  return (
    <Suspense fallback={<p>..loading...</p>}>
      {/* <CategoriesModule data={getAllCategories} /> */}
    </Suspense>
  );
};

export default CategoryPage;
