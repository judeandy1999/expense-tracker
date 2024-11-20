export type Transaction = {
  _id: string;
  date: string;
  amount: number;
  category: Category;
  notes: string;
  type: string;
};

export type Category = {
  _id: string;
  name: string;
  type: string;
};