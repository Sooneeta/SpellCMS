import { useState, useEffect } from "react";
import { useFetchCategories } from "../services/category.service";
import type { Category } from "../types/interfaces";
import { LuCirclePlus } from "react-icons/lu";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../services/category.service";
import DeleteDialog from "../components/DeleteDialog";

const CategoryPage = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { data, isPending, error } = useFetchCategories();
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [category, setCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (data) {
      setCategoryList(data);
    }
  }, [data]);

  if (isPending) return <div>Loading....</div>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  const handleAddUpdateCategory = async () => {
    if (!category.trim()) return;
    if (isEditing && editingCategoryId) {
      const updatedCategory = await updateCategory(editingCategoryId, {
        name: category,
      });
      setCategoryList(
        categoryList.map((item) =>
          item.id === editingCategoryId ? updatedCategory : item
        )
      );
      setIsEditing(false);
      setEditingCategoryId(undefined);
    } else {
      const response = await createCategory({ name: category });
      setCategoryList([...categoryList, response]);
    }
    setCategory("");
  };

  const handleDelete = async (rowData: Category) => {
    setSelectedCategory(rowData);
    setShowDeleteDialog(true);
  };

  const handleEdit = async (rowData: Category) => {
    setCategory(rowData?.name);
    setIsEditing(true);
    setEditingCategoryId(rowData?.id);
  };

  const handleConfirmDelete = async () => {
    if (selectedCategory?.id) {
      const res = await deleteCategory(selectedCategory?.id);
      console.log("res", res);
      setCategoryList((prevCategories) =>
        prevCategories.filter((item) => item?.id !== selectedCategory?.id)
      );
    }
  };

  return (
    <main className=" flex flex-col gap-20">
      <div className="flex flex-col gap-4 md:flex-row gap-2">
        <input
          placeholder="Enter category"
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="md:w-72 p-2 border-2 border-[#1abc9c]"
        />
        <button
          className="flex items-center justify-center w-[70%]  md:w-[21%] gap-2 bg-[#1abc9c] text-white py-2  rounded-md"
          onClick={handleAddUpdateCategory}
        >
          <LuCirclePlus size={20} />
          <span className="font-bold ">ADD/UPDATE CATEGORY</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-6">
        {categoryList?.map((item) => (
          <div
            key={item.id}
            className="w-32  border-2 border-[#1abc9c] flex flex-col gap-4  items-center justify-center  text-lg font-semibold py-8 rounded-xl"
          >
            {item.name}

            <div className="flex gap-2">
              <button
                className="text-green-600 hover:text-green-800"
                onClick={() => handleEdit(item)}
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleDelete(item)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <DeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
};

export default CategoryPage;
