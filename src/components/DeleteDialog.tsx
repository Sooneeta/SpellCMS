import * as Dialog from "@radix-ui/react-dialog";
import { AiFillWarning } from "react-icons/ai";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDialog = ({ isOpen, onClose, onConfirm }: DeleteDialogProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md max-w-md w-full z-100">
          <Dialog.Title className="flex items-center gap-4">
            <AiFillWarning color="orange" size={40} />
            <h2 className="text-lg font-semibold">Are you sure?</h2>
          </Dialog.Title>
          <Dialog.Description className="pl-14">
            This action cannot be undone. This will permanently delete the item.
          </Dialog.Description>
          <div className="mt-6 flex justify-end gap-3 w-full">
            <button
              onClick={onClose}
              className="px-4 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteDialog;
