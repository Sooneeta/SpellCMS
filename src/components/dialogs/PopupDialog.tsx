import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import type { ReactNode } from "react";

interface PopupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
  children: ReactNode;
}

const PopupDialog = ({
  open,
  onOpenChange,
  trigger,
  children,
}: PopupDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          aria-describedby="dialog-description"
        >
          <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-md p-4 px-6 relative">
            <div id="dialog-description" className="sr-only">
              preview popup dialog
            </div>

            {children}

            <Dialog.Close className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer">
              <RxCross2 size={24} />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PopupDialog;
