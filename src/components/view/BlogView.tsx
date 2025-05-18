import * as Dialog from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import { useFetchBlogById } from "../../services/blog.service";
import type { BlogViewProps } from "../../types/interfaces";
import PopupDialog from "../dialogs/PopupDialog";

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

  if (!blog) {
    return null;
  }

  return (
    <PopupDialog open={isOpen} onOpenChange={onClose}>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : error ? (
        <p className="text-red-600">Something went wrong: {error?.message}</p>
      ) : (
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
      )}
    </PopupDialog>
  );
};

export default BlogView;
