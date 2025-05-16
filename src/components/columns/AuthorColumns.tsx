import type { ColumnDef } from "@tanstack/react-table";
import type { Author } from "../../types/interfaces";
import ActionsCell from "../ActionsCell";
import type { AuthorColumnsProps } from "../../types/interfaces";

export const AuthorColumns = ({
  handleView,
  handleEdit,
  handleDelete,
}: AuthorColumnsProps): ColumnDef<Author>[] => [
  {
    accessorKey: "#",
    header: "SN",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "avatar",
    header: "AVATAR",
    cell: ({ row }) => (
      <img src={row.original.avatar} alt="avatar" width={20} />
    ),
  },
  {
    accessorKey: "bio",
    header: "BIO",
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
