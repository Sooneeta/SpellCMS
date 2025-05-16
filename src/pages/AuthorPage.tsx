import { useState, useEffect } from "react";
import type { Author } from "../types/interfaces";
import AuthorList from "../components/lists/AuthorList";
import { useFetchAuthors } from "../services/author.service";

const AuthorPage = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  const { data, isPending, error } = useFetchAuthors();

  useEffect(() => {
    if (data) {
      setAuthors(data);
    }
  }, [data]);

  if (isPending) return <div>Loading....</div>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  const handleAuthorUpdate = (newAuthor: Author) => {
    setAuthors((prevAuthor) => {
      const existingIndex = prevAuthor.findIndex(
        (item) => item.id === newAuthor.id
      );
      if (existingIndex !== -1) {
        return prevAuthor.map((item) =>
          item.id === newAuthor.id ? newAuthor : item
        );
      } else {
        return [...prevAuthor, newAuthor];
      }
    });
  };

  const handleDelete = (deletedAuthor: Author) => {
    setAuthors((prevAuthor) =>
      prevAuthor.filter((item) => item.id !== deletedAuthor?.id)
    );
  };

  return (
    <>
      <AuthorList
        data={authors}
        setData={handleAuthorUpdate}
        handleConfirmDeletion={handleDelete}
      />
    </>
  );
};

export default AuthorPage;
