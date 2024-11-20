import { useState, useEffect } from "react";
import { Category } from "@/types/data-types";

const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories", {
        next: { revalidate: 60 }, // Optional: Revalidate cache every 60 seconds
      });
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      await fetch(`/api/categories?categoryId=${categoryId}`, {
        method: 'DELETE',
      });
      fetchCategories(); // Refresh categories after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleNewCategory = () => {
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, fetchCategories, handleNewCategory, deleteCategory };
};

export default useCategory;
