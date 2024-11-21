"use client";

import { useState } from "react";
import useCategory from "@/hooks/useCategory";
import { Category } from "@/types/data-types";
import TrackerTable from "../components/trackerTable";

const EditorPage = () => {
  const { categories, fetchCategories, handleNewCategory, deleteCategory } = useCategory();
  
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add income");
      }

      // Clear the form
      setName("");
      setType("");

      fetchCategories();

      // Notify parent about the new transaction
      handleNewCategory();
    } catch (err: any) {
      
    }
  };

  return (
  <div className="border-gray-900/10">
    <h2 className="text-base/7 font-semibold text-gray-900">Add Transaction</h2>
      <TrackerTable 
        type="all"
        tableFields={categories}
        deleteQuestion={'Are you sure you want to delete? All the transaction associated to this category will be deleted.'}
        deleteFieldFunction={deleteCategory}
        loading={false}
        actionRequired={true}
      />
    <form onSubmit={handleAddCategory} style={{ marginBottom: "20px" }}>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
            Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

      <div className="col-start-1 col-span-2">
          <label htmlFor="type" className="block text-sm/6 font-medium text-gray-900">
            Type
          </label>
          <div className="mt-1">
          <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              id="type"
              name="type"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
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
    {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
  </div>
  );
};

export default EditorPage;
