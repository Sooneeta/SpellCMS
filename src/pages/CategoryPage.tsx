import { useState, useEffect } from "react";
import { useFetchCategories } from "../services/category.service";
import type { Category } from "../types/interfaces";
import { LuCirclePlus } from "react-icons/lu";
import { createCategory } from "../services/category.service";

const CategoryPage = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const { data, isPending, error } = useFetchCategories();
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (data) {
      setCategoryList(data);
    }
  }, [data]);

  if (isPending) return <div>Loading....</div>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  const handleAddCategory = async () => {
    if (!category.trim()) return;
    const response = await createCategory({ name: category });
    setCategoryList([...categoryList, response]);
  };

  return (
    <main className="p-6 flex flex-col gap-20">
      <div className="flex gap-2">
        <input
          placeholder="Enter category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-64 p-2 border-2 border-[#1abc9c]"
        />
        <button
          className="flex items-center justify-center w-[15%] gap-2 bg-[#1abc9c] text-white p-2 rounded-md"
          onClick={handleAddCategory}
        >
          <LuCirclePlus size={20} />
          <span className="font-bold ">ADD CATEGORY</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-6">
        {categoryList?.map((item) => (
          <div
            key={item.id}
            className="w-32  border-2 border-[#1abc9c] flex items-center justify-center  text-lg font-semibold py-10 rounded-xl"
          >
            {item.name}
          </div>
        ))}
      </div>
    </main>
  );
};

export default CategoryPage;
