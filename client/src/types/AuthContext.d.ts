import type { User } from "../../../server/src/modules/user/user";

export type AuthProps = {
  auth: boolean;
  setAuth: (value: boolean) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  user: User | null;
};
