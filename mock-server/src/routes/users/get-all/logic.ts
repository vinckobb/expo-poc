interface User {
  id: string;
  name: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  return [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Emma Johnson" },
    { id: "3", name: "Michael Brown" },
  ];
};
