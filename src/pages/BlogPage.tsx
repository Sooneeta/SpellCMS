import { useState, useEffect } from "react";
import type { Blog } from "../types/interfaces";
import BlogList from "../components/lists/BlogList";
import { useFetchBlogs } from "../services/blog.service";

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { data, isPending, error } = useFetchBlogs();

  useEffect(() => {
    if (data) {
      setBlogs(data);
    }
  }, [data]);

  if (isPending) return <div>Loading....</div>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  const handleBlogUpdate = (newBlog: Blog) => {
    setBlogs((prevBlog) => {
      const existingIndex = prevBlog.findIndex(
        (item) => item.id === newBlog.id
      );
      if (existingIndex !== -1) {
        return prevBlog.map((item) =>
          item.id === newBlog.id ? newBlog : item
        );
      } else {
        return [...prevBlog, newBlog];
      }
    });
  };

  const handleDelete = (deletedBlog: Blog) => {
    setBlogs((prevBlog) =>
      prevBlog.filter((item) => item.id !== deletedBlog?.id)
    );
  };

  return (
    <>
      <BlogList
        data={blogs}
        setData={handleBlogUpdate}
        handleConfirmDeletion={handleDelete}
      />
    </>
  );
};

export default BlogPage;
