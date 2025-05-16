import * as z from "zod";
import { STATUS } from "./enums";

export const authFormSchema = z.object({
    email: z.string().min(1, {
        message: "Email is required"
    }).email({
        message: "Email is not valid"
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
})



export const authorSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    avatar: z.string().min(1, {
        messsage: "Avatar is required"
    }),
    bio: z.string().min(1, {
        message: "Bio is required"
    })
})

export const categorySchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    })
})


export const blogSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    body: z.string().min(1, {
        message: "Body is required"
    }),
    author: z.string().min(1, {
        message: "Author is required"
    }),
    category: z.string().min(1, {
        message: "Category is required"
    }),
    tags: z.array(z.string()).min(1, {
        message: "At least one tag is required"
    }),
    status: z.enum(STATUS, {
        errorMap: () => ({ message: "Status is required" })
    }),
    coverImage: z.string().min(1, {
        message: "Cover image is required"
    }),
})