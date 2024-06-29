import { GetMultipleWithPagination, User } from "./reusables";

//type for getting all countertypes
export type CounterTypes = GetMultipleWithPagination & {
  content: CounterType[];
};

//type for create countertype, update countertype, and get countertype by id
export type CounterType = {
  id: string;
  name: string;
  abbrev: string;
  currentIndex?: number;
  status: number;
  createdBy?: User;
  createdAt?: Date;
  updatedAt?: Date;
};
