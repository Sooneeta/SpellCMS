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
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 px-10 rounded-md md:max-w-xl  w-full z-100"
          aria-describedby="dialog-description"
        >
          <div className="w-full relative">
            {children}

            <Dialog.Close className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 cursor-pointer">
              <RxCross2 size={24} />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PopupDialog;
