"use client";

import useTransactions from "@/hooks/useTransactions";
import AddTransactionForm from "../components/form";
import TrackerTable from "../components/trackerTable";

const TransactionsPage = () => {
  const { transactions, loading, deleteTransaction, handleNewTransaction } = useTransactions();

  const incomeTransactions = transactions.filter((t) => t.type === "income");
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  return (
    <div className="" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <AddTransactionForm 
        onTransactionAdded={handleNewTransaction} 
      />
      <div className="flex justify-around">
        <TrackerTable 
          type="expense"
          tableFields={expenseTransactions}
          deleteField={deleteTransaction}
          loading={loading}
        />
        <TrackerTable 
          type="income"
          tableFields={incomeTransactions}
          deleteField={deleteTransaction}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default TransactionsPage;
