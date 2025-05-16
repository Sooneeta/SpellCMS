const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const createBlog = async (params: any) => {
    const res = await fetch(`${API_BASE_URL}/blogs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error("Failed to create Blog");
    return res.json();
};


const updateBlog = async (id: string, params: any) => {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error("Failed to update Blog");
    return res.json();
};

const deleteBlog = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete Blog");
    return res.json();
};

const fetchBlogById = async (id: string | undefined) => {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!res.ok) throw new Error("Failed to fetch Blog by id");
    return res.json();
}

const fetchBlogs = async () => {
    const res = await fetch(`${API_BASE_URL}/blogs`);
    if (!res.ok) throw new Error("Failed to fetch Blogs");
    return res.json();
};


const useFetchBlogs = (
): UseQueryResult<any, Error> => {
    return useQuery({
        queryKey: ["fetch-Blogs"],
        queryFn: () => fetchBlogs(),
    });
};

const useFetchBlogById = (id: string | undefined, initialData?: any) => {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => fetchBlogById(id),
        initialData: initialData || undefined,
        enabled: !!id,
    });
};

export {
    createBlog,
    updateBlog,
    deleteBlog,
    fetchBlogById,
    useFetchBlogs,
    fetchBlogs,
    useFetchBlogById
}
