import { getProfile } from "@/modules/auth/services/auth.services";
import { getAllQuizAttemptsByUser } from "@/modules/dashboard/services/quiz-attempt.services";
import ProfileModule from "@/modules/profile/pages/profile";
import { cookies } from "next/headers";
import React from "react";

const ProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  const getProfileData = await getProfile(token?.value);

  const getQuizAttemptsData = await getAllQuizAttemptsByUser({
    userID: getProfileData?.data.id,
    token: token?.value,
  });

  return <ProfileModule data={getQuizAttemptsData.data} />;
};

export default ProfilePage;
