import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { LuCirclePlus } from "react-icons/lu";
import type { Author } from "../../types/interfaces";
import AutherForm from "../forms/AuthorForm";
import type { AuthorListProps } from "../../types/interfaces";
import { deleteAuthor } from "../../services/author.service";
import { AuthorColumns } from "../columns/AuthorColumns";
import { DataTable } from "../DataTable";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import DeleteDialog from "../DeleteDialog";
import AuthorView from "../view/AuthorView";

const AuthorList = ({
  data,
  setData,
  handleConfirmDeletion,
}: AuthorListProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | undefined>();
  const [showViewDialog, setShowViewDialog] = useState(false);

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleEdit = (rowData: Author) => {
    setSelectedAuthor(rowData);
    setIsPopoverOpen(true);
  };

  const handleView = (rowData: Author) => {
    setSelectedAuthor(rowData);
    setShowViewDialog(true);
  };

  const handleDelete = (rowData: Author) => {
    setSelectedAuthor(rowData);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedAuthor?.id) {
      const res = await deleteAuthor(selectedAuthor?.id);
      console.log("res", res);
      if (res) {
        handleConfirmDeletion(selectedAuthor);
        setShowDeleteDialog(false);
      }
    }
  };

  const table = useReactTable({
    data,
    columns: AuthorColumns({ handleView, handleEdit, handleDelete }),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-10">
      <Dialog.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <Dialog.Trigger asChild>
          <button className="flex items-center justify-center w-[30%] md:w-[13%] gap-2 bg-[#1abc9c] text-white py-2 rounded-md">
            <LuCirclePlus size={20} />
            <span className="font-bold">ADD AUTHOR</span>
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md max-w-md w-full z-100">
            <Dialog.Title>
              {selectedAuthor ? "Update" : "Add"} Author
            </Dialog.Title>
            <AutherForm
              data={selectedAuthor}
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
      <AuthorView
        isOpen={showViewDialog}
        onClose={() => setShowViewDialog(false)}
        selectedAuthor={selectedAuthor}
      />
    </div>
  );
};

export default AuthorList;
