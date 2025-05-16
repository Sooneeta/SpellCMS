const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const createCategory = async (params: any) => {
    const res = await fetch(`${API_BASE_URL}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error("Failed to create Category");
    return res.json();
};


const updateCategory = async (id: string, params: any) => {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error("Failed to update Category");
    return res.json();
};

const deleteCategory = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete Category");
    return res.json();
};

const fetchCategories = async () => {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch Authors");
    return res.json();
}

const useFetchCategories = (
): UseQueryResult<any, Error> => {
    return useQuery({
        queryKey: ["fetch-categories"],
        queryFn: () => fetchCategories(),
    });
};


export {
    createCategory,
    updateCategory,
    deleteCategory,
    fetchCategories,
    useFetchCategories,
}
