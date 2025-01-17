export type User = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirm_password: string;
  github_url: string;
  linkedin_url: string;
  level?: number;
  register_date?: string;
  profil_img: string;
  is_admin?: boolean;
};
