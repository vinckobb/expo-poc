export interface User {
  id: string;
  name: string;
}

export interface GetAllUsersResponse {
  users: User[];
}

export interface ErrorResponse {
  error: string;
}
