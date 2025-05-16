import { useState, useEffect } from "react";
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

const BlogList = ({ data, setData, handleConfirmDeletion }: BlogListProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>();
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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

  const table = useReactTable({
    data,
    columns: BlogColumns({
      handleView,
      handleEdit,
      handleDelete,
      authors,
      categories,
      handleStatusToggle,
    }),
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="flex flex-col gap-10">
      <Dialog.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <Dialog.Trigger asChild>
          <button className="flex items-center justify-center w-32 gap-2 bg-[#1abc9c] text-white p-2 rounded-md">
            <LuCirclePlus size={20} />
            <span className="font-bold ">ADD BLOG</span>
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 px-10 rounded-md max-w-xl w-full z-100">
            <Dialog.Title className="text-center font-bold text-xl text-[#1abc9c]">
              {selectedBlog ? "Update" : "Add"} Blog
            </Dialog.Title>
            <BlogForm
              data={selectedBlog}
              setData={setData}
              onClose={handleClosePopover}
            />
            <Dialog.Close asChild></Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

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
