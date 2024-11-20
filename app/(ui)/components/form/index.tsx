"use client";

import { useState } from "react";
import useCategory from "@/hooks/useCategory";
import { Category } from "@/types/data-types";

const AddTransactionForm = ({onTransactionAdded }: { onTransactionAdded: () => void }) => {
  const { categories } = useCategory();

  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddIncome = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          amount: parseFloat(amount),
          category,
          notes,
          type: category?.type || ""
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add income");
      }

      // Clear the form
      setDate(new Date().toISOString().split('T')[0]);
      setAmount("");
      setCategory(null);
      setNotes("");
      setError(null);

      // Notify parent about the new transaction
      onTransactionAdded();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
  <div className="border-gray-900/10">
    <h2 className="text-base/7 font-semibold text-gray-900">Add Category</h2>
    
    <form onSubmit={handleAddIncome} style={{ marginBottom: "20px" }}>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <label htmlFor="date" className="block text-sm/6 font-medium text-gray-900">
            Date:
          </label>
          <div className="mt-1">
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="col-start-1 col-span-2">
          <label htmlFor="amount" className="block text-sm/6 font-medium text-gray-900">
            Amount
          </label>
          <div className="mt-1">
            <input
              type="number"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              id="amount"
              name="amount"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="col-span-2 col-start-1">
          <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
            Category
          </label>
          <div className="mt-1">
            <select
              value={category?.name || ""}
              onChange={(e) => {
                const selectedCategory = categories.find(cat => cat.name === e.target.value);
                setCategory(selectedCategory || null);
              }}
              required
              id="category"
              name="category"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category: Category) => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-3 col-start-4 row-start-1 row-span-1">
          <label htmlFor="notes" className="block text-sm/6 font-medium text-gray-900">
            Notes
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              id="notes"
              name="notes"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
      </div>

      <button
          type="submit"
          className="mt-2 rounded-md bg-indigo-600 px-3 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Transaction
        </button>
    </form>
    {error && <p style={{ color: "red" }}>{error}</p>}
  </div>
  );
};

export default AddTransactionForm;
