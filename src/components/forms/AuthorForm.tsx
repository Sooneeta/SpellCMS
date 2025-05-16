import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema } from "../../types/form.d";
import type { AuthorFormProps } from "../../types/interfaces";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { createAuthor, updateAuthor } from "../../services/author.service";
import type { Author } from "../../types/interfaces";
import { uploadImage } from "../../services/imageupload.service";

const AutherForm = ({ setData, onClose, data }: AuthorFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof authorSchema>>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: "",
      avatar: "",
      bio: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (submittedData: z.infer<typeof authorSchema>) => {
      let coverImageUrl = submittedData.avatar;

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
        avatar: coverImageUrl,
      };
      return data?.id
        ? updateAuthor(data?.id, formData)
        : createAuthor(formData);
    },
    onSuccess: (response: Author) => {
      setData(response);
      onClose();
    },
    onError: (error: Error) => {
      console.log("error", error);
    },
  });

  const onSubmit = (values: z.infer<typeof authorSchema>) => {
    mutation.mutate(values);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setValue("avatar", previewUrl);
      fileRef.current = file;
    } else {
      setImagePreview(null);
      setValue("avatar", "");
      fileRef.current = null;
    }
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
        name: data.name || "",
        avatar: data.avatar || "",
        bio: data.bio || "",
      });
      setImagePreview(data.avatar || null);
      fileRef.current = null;
    }
  }, [data, reset]);

  const handleClear = () => {
    reset({
      name: "",
      avatar: "",
      bio: "",
    });
    setImagePreview(null);
    fileRef.current = null;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="off"
          {...register("name")}
          className="mt-1 block w-full border rounded-md p-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="avatar" className="block text-sm font-medium">
          Avatar
        </label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full border rounded-md p-2"
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

        {errors.avatar && (
          <p className="text-red-500 text-sm">{errors.avatar.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-medium">
          Bio
        </label>
        <input
          id="bio"
          type="text"
          autoComplete="off"
          {...register("bio")}
          className="mt-1 block w-full border rounded-md p-2"
        />
        {errors.bio && (
          <p className="text-red-500 text-sm">{errors.bio.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {mutation.isPending ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AutherForm;
