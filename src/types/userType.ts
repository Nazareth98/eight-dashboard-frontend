interface UserType {
  id?: number;
  name: string;
  lastname: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  position: string;
  accessLevel: number;
  status: number;
}

export default UserType;
