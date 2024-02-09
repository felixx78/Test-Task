export type User = {
  id: string;
  username: string;
};

export type Domain = {
  name: string;
  ip: string;
  port: number;
  username: string;
  password: string;
  _id?: string;
  userId?: string;
};
