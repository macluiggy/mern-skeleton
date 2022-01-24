export type TRead = (
  params: { userId: string },
  credentials: { t: string },
  signal: AbortSignal
) => Promise<{
  _id: string;
  name: string;
  email: string;
  created: string;
  error?: any;
}>;

export type TUpdate = (
  params: { userId: string },
  credentials: { t: string },
  user: {
    name: string;
    email: string;
    password: string;
  }
) => Promise<{
  _id: string;
  name: string;
  email: string;
  created: Date | undefined;
  updated: Date | undefined;
  error?: any;
}>;
