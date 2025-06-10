export type ProfileResponse = {
  data: ProfileType;
  message: string;
};

export type ProfileType = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  profilePhoto: string | null;
  userType: "google" | "admin";
};
