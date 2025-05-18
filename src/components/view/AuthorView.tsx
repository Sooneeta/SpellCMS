import * as Dialog from "@radix-ui/react-dialog";
import { useFetchAuthorById } from "../../services/author.service";
import type { AuthorViewProps } from "../../types/interfaces";
import PopupDialog from "../dialogs/PopupDialog";

const AuthorView = ({ isOpen, onClose, selectedAuthor }: AuthorViewProps) => {
  const { data, isLoading, error } = useFetchAuthorById(selectedAuthor?.id);
  const author = data;

  if (!author) {
    return null;
  }

  return (
    <PopupDialog open={isOpen} onOpenChange={onClose}>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : error ? (
        <p className="text-red-600">Something went wrong: {error.message}</p>
      ) : (
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
      )}
    </PopupDialog>
  );
};

export default AuthorView;
