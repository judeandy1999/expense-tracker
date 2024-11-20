import { useState, useEffect } from "react";
import { Transaction } from "@/types/data-types";

const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/transactions", {
        next: { revalidate: 60 }, // Optional: Revalidate cache every 60 seconds
      });
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (transactionId: string) => {
    await fetch(`/api/transactions?transactionId=${transactionId}`, {
      method: 'DELETE',
    });

    fetchTransactions();
  };

  const handleNewTransaction = () => {
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions, loading, handleNewTransaction, deleteTransaction };
};

export default useTransactions;
