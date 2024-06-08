export type User = {
  avatar_url: string;
  name: string;
};

export type History = {
  searchterm: string;
  result: User | null;
};
