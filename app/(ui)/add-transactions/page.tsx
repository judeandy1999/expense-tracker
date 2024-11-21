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
          deleteFieldFunction={deleteTransaction}
          deleteQuestion={'Are you sure you want to delete?'}
          loading={loading}
          actionRequired={true}
        />
        <TrackerTable 
          type="income"
          tableFields={incomeTransactions}
          deleteFieldFunction={deleteTransaction}
          deleteQuestion={'Are you sure you want to delete?'}
          loading={loading}
          actionRequired={true}
        />
      </div>
    </div>
  );
};

export default TransactionsPage;
