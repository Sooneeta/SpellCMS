import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";

import { useFetchAuthorById } from "../../services/author.service";
import type { AuthorViewProps } from "../../types/interfaces";

const AuthorView = ({ isOpen, onClose, selectedAuthor }: AuthorViewProps) => {
  const { data, isLoading, error } = useFetchAuthorById(selectedAuthor?.id);
  const author = data;

  if (isLoading) {
    return (
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-600">Loading...</p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  if (error) {
    return (
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <p className="text-red-600">
              Something went wrong: {error.message}
            </p>
            <Dialog.Close className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <RxCross2 size={24} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  if (!author) {
    return null;
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="space-y-6">
            {author.avatar && (
              <div className="flex justify-center">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/128";
                  }}
                />
              </div>
            )}

            <Dialog.Title className="text-2xl font-bold text-gray-900 text-center">
              {author.name}
            </Dialog.Title>

            {author.bio && (
              <div className="prose prose-sm text-gray-700 text-center">
                <p>{author.bio}</p>
              </div>
            )}
          </div>

          <Dialog.Close className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <RxCross2 size={24} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AuthorView;
