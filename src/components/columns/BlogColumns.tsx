import type { ColumnDef } from "@tanstack/react-table";
import type { BlogColumnsProps } from "../../types/interfaces";
import ActionsCell from "../ActionsCell";
import type { Blog } from "../../types/interfaces";
import dayjs from "dayjs";

export const BlogColumns = ({
  handleView,
  handleEdit,
  handleDelete,
  authors,
  handleStatusToggle,
  categories,
}: BlogColumnsProps): ColumnDef<Blog>[] => [
  {
    accessorKey: "#",
    header: "SN",
    cell: ({ row }) => row.index + 1,
    size: 50,
  },

  {
    accessorKey: "title",
    header: "TITLE",
  },
  {
    accessorKey: "author",
    header: "AUTHOR",
    cell: ({ row }) => {
      const author = authors?.find((a) => a.id === row.original.author);
      return author?.name || "--";
    },
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
    cell: ({ row }) => {
      const category = categories?.find((c) => c.id === row.original.category);
      return category?.name || "--";
    },
  },
  {
    accessorKey: "tags",
    header: "TAGS",
    cell: ({ row }) =>
      row?.original?.tags?.map((item) => (
        <span key={item}>
          {item}
          {","}{" "}
        </span>
      )),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const isPublished = row.original.status === "Published";
      return (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={() => handleStatusToggle(row.original)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-500 transition-colors"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
        </label>
      );
    },
  },
  {
    accessorKey: "createdDate",
    header: "CREATED DATE",
    cell: ({ row }) => {
      const formattedDate = dayjs(row?.original?.createdDate).format(
        "DD/MM/YYYY h:mm A"
      );
      return formattedDate;
    },
  },
  {
    accessorKey: "actions",
    header: "ACTIONS",
    cell: ({ row }) => (
      <ActionsCell
        rowData={row.original}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
  },
];
3;
