import { useState, useEffect, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { LuCirclePlus } from "react-icons/lu";
import type { Blog } from "../../types/interfaces";
import BlogForm from "../forms/BlogForm";
import type { BlogListProps } from "../../types/interfaces";
import { deleteBlog } from "../../services/blog.service";
import { BlogColumns } from "../columns/BlogColumns";
import { DataTable } from "../DataTable";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import DeleteDialog from "../DeleteDialog";
import { fetchAuthors } from "../../services/author.service";
import type { Author } from "../../types/interfaces";
import { updateBlog } from "../../services/blog.service";
import { fetchCategories } from "../../services/category.service";
import type { Category } from "../../types/interfaces";
import BlogView from "../view/BlogView";
import PopupDialog from "../dialogs/PopupDialog";

const BlogList = ({ data, setData, handleConfirmDeletion }: BlogListProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>();
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const getAllAuthors = async () => {
      const response = await fetchAuthors();
      setAuthors(response);
    };
    const getAllCategories = async () => {
      const res = await fetchCategories();
      setCategories(res);
    };
    getAllAuthors();
    getAllCategories();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((blog) => {
      const matchesTitleOrTag =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesStatus = selectedStatus
        ? blog.status === selectedStatus
        : true;

      const matchesCategory = selectedCategory
        ? blog.category === selectedCategory
        : true;

      return matchesTitleOrTag && matchesStatus && matchesCategory;
    });
  }, [data, searchQuery, selectedStatus, selectedCategory]);

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleEdit = (rowData: Blog) => {
    setSelectedBlog(rowData);
    setIsPopoverOpen(true);
  };

  const handleView = (rowData: Blog) => {
    setSelectedBlog(rowData);
    setShowViewDialog(true);
  };

  const handleDelete = (rowData: Blog) => {
    setSelectedBlog(rowData);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedBlog?.id) {
      const res = await deleteBlog(selectedBlog?.id);
      console.log("res", res);
      if (res) {
        handleConfirmDeletion(selectedBlog);
        setShowDeleteDialog(false);
      }
    }
  };

  const handleStatusToggle = async (blog: Blog) => {
    if (!blog.id) {
      console.error("Blog ID is undefined");
      return;
    }
    const newStatus = blog.status === "Published" ? "Draft" : "Published";
    try {
      const updatedBlog = await updateBlog(blog.id, {
        ...blog,
        status: newStatus,
      });
      setData(updatedBlog);
    } catch (error) {
      console.error("Failed to update blog status:", error);
    }
  };

  const columns = useMemo(
    () =>
      BlogColumns({
        handleView,
        handleEdit,
        handleDelete,
        authors,
        categories,
        handleStatusToggle,
      }),
    [authors, categories]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const debounce = (func: (value: string) => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (value: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(value), delay);
    };
  };

  const debouncedSetSearchQuery = debounce(setSearchQuery, 300);
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <PopupDialog
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          trigger={
            <button className="flex items-center justify-center w-32 gap-2 bg-[#1abc9c] text-white p-2 rounded-md">
              <LuCirclePlus size={20} />
              <span className="font-bold ">ADD BLOG</span>
            </button>
          }
        >
          <Dialog.Title className="text-center font-bold text-xl text-[#1abc9c]">
            {selectedBlog ? "Update" : "Add"} Blog
          </Dialog.Title>
          <BlogForm
            data={selectedBlog}
            setData={setData}
            onClose={handleClosePopover}
          />
        </PopupDialog>
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search by title or tag..."
            onChange={(e) => debouncedSetSearchQuery(e.target.value)}
            className="p-2 border border-gray-400 rounded-md w-64"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 border border-gray-400 rounded-md"
          >
            <option value="">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-gray-400 rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DataTable table={table} />
      <DeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
      <BlogView
        isOpen={showViewDialog}
        onClose={() => setShowViewDialog(false)}
        selectedBlog={selectedBlog}
        authors={authors}
        categories={categories}
      />
    </div>
  );
};

export default BlogList;
