"use client";

import TrackerTable from "./(ui)/components/trackerTable";
import useTransactions from "@/hooks/useTransactions";

export default function Home() {
  const { transactions, loading, handleNewTransaction } = useTransactions();

  return (
    <main className="flex justify-center">
      <TrackerTable 
        type="all"
        tableFields={transactions}
        loading={loading}
        actionRequired={false}
      />
    </main>
  );
}
