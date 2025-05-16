const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const createAuthor = async (params: any) => {
    const res = await fetch(`${API_BASE_URL}/authors`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error("Failed to create Author");
    return res.json();
};


const updateAuthor = async (id: string, params: any) => {
    const res = await fetch(`${API_BASE_URL}/authors/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error("Failed to update Author");
    return res.json();
};

const deleteAuthor = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/authors/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete Author");
    return res.json();
};

const fetchAuthorById = async (id: string | undefined) => {
    const res = await fetch(`${API_BASE_URL}/authors/${id}`);
    if (!res.ok) throw new Error("Failed to fetch Author by id");
    return res.json();
}

const fetchAuthors = async () => {
    const res = await fetch(`${API_BASE_URL}/authors`);
    if (!res.ok) throw new Error("Failed to fetch Authors");
    return res.json();
};


const useFetchAuthors = (
): UseQueryResult<any, Error> => {
    return useQuery({
        queryKey: ["fetch-Authors"],
        queryFn: () => fetchAuthors(),
    });
};

const useFetchAuthorById = (id: string | undefined, initialData?: any) => {
    return useQuery({
        queryKey: ["author", id],
        queryFn: () => fetchAuthorById(id),
        initialData: initialData || undefined,
        enabled: !!id,
    });
};

export {
    createAuthor,
    updateAuthor,
    deleteAuthor,
    fetchAuthorById,
    useFetchAuthors,
    fetchAuthors,
    useFetchAuthorById,
}
