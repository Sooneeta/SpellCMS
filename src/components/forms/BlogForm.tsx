import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "../../types/form.d";
import type { Author, BlogFormProps } from "../../types/interfaces";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { STATUS } from "../../types/enums";
import { updateBlog, createBlog } from "../../services/blog.service";
import { fetchAuthors } from "../../services/author.service";
import { uploadImage } from "../../services/imageupload.service";
import type { Blog } from "../../types/interfaces";
import { fetchCategories } from "../../services/category.service";
import type { Category } from "../../types/interfaces";

const BlogForm = ({ setData, onClose, data }: BlogFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<File | null>(null);

  const getAllAuthors = async () => {
    const response = await fetchAuthors();
    setAuthors(response);
  };

  const getAllCategories = async () => {
    const res = await fetchCategories();
    setCategories(res);
  };

  useEffect(() => {
    getAllAuthors();
    getAllCategories();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      body: "",
      author: "",
      category: "",
      tags: [],
      status: "",
      coverImage: "",
    },
  });

  const tags = watch("tags");

  const mutation = useMutation({
    mutationFn: async (submittedData: z.infer<typeof blogSchema>) => {
      let coverImageUrl = submittedData.coverImage;

      if (fileRef.current) {
        try {
          coverImageUrl = await uploadImage(fileRef.current);
        } catch (error) {
          throw new Error(
            "Failed to upload image: " + (error as Error).message
          );
        }
      }

      const formData = {
        ...submittedData,
        coverImage: coverImageUrl,
        createdDate: Date.now(),
      };

      return data?.id ? updateBlog(data.id, formData) : createBlog(formData);
    },
    onSuccess: (response: Blog) => {
      setData(response);
      onClose();
    },
    onError: (error: Error) => {
      console.log("err", error);
    },
  });

  const onSubmit = (values: z.infer<typeof blogSchema>) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    if (data) {
      reset({
        title: data.title || "",
        body: data.body || "",
        author: data.author || "",
        category: data.category || "",
        tags: data.tags || [],
        status: data.status || "",
        coverImage: data.coverImage || "",
      });
      setImagePreview(data.coverImage || null);
      fileRef.current = null;
    }
  }, [data, reset]);

  const handleClear = () => {
    reset({
      title: "",
      body: "",
      author: "",
      category: "",
      tags: [],
      status: "",
      coverImage: "",
    });
    setImagePreview(null);
    setTagInput("");
    fileRef.current = null;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setValue("coverImage", previewUrl);
      fileRef.current = file;
    } else {
      setImagePreview(null);
      setValue("coverImage", "");
      fileRef.current = null;
    }
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTags = [...(tags || []), tagInput.trim()];
      setValue("tags", newTags);
      setTagInput("");
      inputRef.current?.focus();
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setValue("tags", newTags);
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          autoComplete="off"
          {...register("title")}
          className="mt-1 block w-full border border-gray-700 rounded-md p-2"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium">
          Body
        </label>
        <textarea
          id="body"
          {...register("body")}
          className="mt-1 block w-full border border-gray-700 rounded-md p-2 resize-y"
          rows={2}
          placeholder="Enter the blog content..."
        />
        {errors.body && (
          <p className="text-red-500 text-sm">{errors.body.message}</p>
        )}
      </div>

      <div className="flex w-full gap-2">
        <div className="w-full">
          <label htmlFor="author" className="block text-sm font-medium">
            Author
          </label>
          <select
            id="author"
            {...register("author")}
            className="mt-1 block w-full border border-gray-700 rounded-md p-2"
          >
            <option value="">Select author</option>
            {authors.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author.message}</p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            {...register("category")}
            className="mt-1 block w-full border border-gray-700 rounded-md p-2"
          >
            <option value="">Select category</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="status" className="block text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="mt-1 block w-full border border-gray-700 rounded-md p-2"
          >
            <option value="">Select status</option>
            {STATUS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium">
          Tags
        </label>
        <div className="mt-1 flex flex-wrap items-center gap-2 border rounded-md p-2 bg-white">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-[rgb(26,188,156)] text-white rounded-lg text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleTagRemove(tag)}
                className="ml-1 text-white hover:text-blue-900"
              >
                ×
              </button>
            </span>
          ))}
          <input
            id="tags"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagAdd}
            ref={inputRef}
            className="flex-1 border-none p-1 focus:ring-0 min-w-[100px]"
            placeholder={tags?.length ? "" : "Type a tag and press Enter"}
          />
        </div>
        {errors.tags && (
          <p className="text-red-500 text-sm">{errors.tags.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium">
          Cover Image
        </label>
        <input
          id="coverImage"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full border border-gray-700 rounded-md p-2"
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Cover preview"
              className="max-w-full h-auto max-h-48 object-contain"
            />
          </div>
        )}
        {errors.coverImage && (
          <p className="text-red-500 text-sm">{errors.coverImage.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={handleClear}
          className="px-4  bg-gray-200 rounded-md"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-4 py-1 bg-[#1abc9c] text-white rounded-md disabled:opacity-50"
        >
          {mutation.isPending ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
