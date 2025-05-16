import * as Dialog from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import { RxCross2 } from "react-icons/rx";
import { useFetchBlogById } from "../../services/blog.service";

import type { BlogViewProps } from "../../types/interfaces";

const BlogView = ({
  isOpen,
  onClose,
  selectedBlog,
  authors,
  categories,
}: BlogViewProps) => {
  const { data, isLoading, error } = useFetchBlogById(selectedBlog?.id);

  const blog = data;

  const author = authors.find((a) => a?.id === blog?.author);
  const category = categories.find((c) => c?.id === blog?.category);

  if (isLoading) {
    return (
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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

  if (!blog) {
    return null;
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="space-y-6">
            {blog.coverImage && (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}

            <Dialog.Title className="text-3xl font-bold text-gray-900">
              {blog.title}
            </Dialog.Title>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>By {author?.name}</span>
                <span>•</span>
                <span>{dayjs(blog.createdDate).format("MMMM D, YYYY")}</span>
              </div>
              <span className="mt-2 sm:mt-0">Category: {category?.name}</span>
            </div>

            <div className="prose prose-lg text-gray-700">
              <p>{blog.body}</p>
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="text-sm text-gray-500">
              Status: <span className="font-medium">{blog.status}</span>
            </div>
          </div>

          <Dialog.Close className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <RxCross2 size={24} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BlogView;
