export type Blog = {
    id?: string;
    title: string;
    body: string;
    author: string;
    category: string;
    tags: string[];
    status: string;
    coverImage: string;
    createdDate?: string;
}

export interface BlogFormProps {
    setData: (prevData: Blog) => void;
    onClose: () => void;
    data?: Blog;

}

export interface BlogListProps {
    data: Blog[];
    setData: (prevData: Blog) => void;
    handleConfirmDeletion: (rowData: Blog) => void;
}

export type Author = {
    id?: string;
    name: string;
    avatar: string;
    bio: string;
}

export interface AuthorFormProps {
    setData: (prevData: Author) => void;
    onClose: () => void;
    data?: Author;
}

export interface AuthorListProps {
    data: Author[];
    setData: (prevData: Author) => void;
    handleConfirmDeletion: (rowData: Author) => void;
}

export interface BlogColumnsProps {
    handleView: (rowData: Blog) => void,
    handleEdit: (rowData: Blog) => void,
    handleDelete: (rowData: Blog) => void,
    authors: Author[],
    handleStatusToggle: (rowData: Blog) => void,
    categories: Category[],
}

export interface AuthorColumnsProps {
    handleView: (rowData: Author) => void,
    handleEdit: (rowData: Author) => void,
    handleDelete: (rowData: Author) => void,
}

export interface ActionsCellProps {
    rowData: any;
    onView: (rowData: any) => void;
    onEdit: (rowData: any) => void;
    onDelete: (rowData: any) => void;
}

export type Category = {
    id?: string;
    name: string;
}

export interface BlogViewProps {
    isOpen: boolean;
    onClose: () => void;
    selectedBlog: Blog | undefined;
}

export interface AuthorViewProps {
    isOpen: boolean;
    onClose: () => void;
    selectedAuthor: Author | undefined;
}