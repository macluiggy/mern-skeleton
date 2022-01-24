export type TRead = (
  params: { userId: string },
  credentials: { t: string },
  signal: AbortSignal
) => Promise<{
  _id: string;
  name: string;
  email: string;
  created: Date | undefined;
  error?: any;
}>;

export type TUpdate = (
  params: { userId: string },
  credentials: { t: string },
  user: AbortSignal
) => Promise<{
  _id: string;
  name: string;
  email: string;
  created: Date | undefined;
  error?: any;
}>;
