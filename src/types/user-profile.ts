export type UserProfile = {
  id?: string;
  avatar?: string;
  image?: string;
  name?: string;
  role?: string;

  // groups?: Group[];
  time?: string;
  tier?: string;
  // Progress?: ProfileProgress;
};

export type UserCardProps = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  role: string;
  visits: number;
  progress: number;
  status: string;
  orderStatus: string;
  contact: number;
  country: string;
  address: string;
  fatherName: string;
  about: string;
  avatar: number;
  skills: string[];
  time: string;
};
