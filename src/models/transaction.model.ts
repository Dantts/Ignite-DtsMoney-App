export interface ITransactionProps {
  id?: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  createdAt: string;
}