interface User {
  id: number;
  nickname: string;
  email: string;
  joinDate?: string;
  isNewUser?: boolean;
}

export default User;
