import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import ProtectedLayout from "./layouts/ProtectedLayout";

const Login = lazy(() => import("../src/pages/LoginPage"));
const Blog = lazy(() => import("../src/pages/BlogPage"));
const Author = lazy(() => import("../src/pages/AuthorPage"));
const Category = lazy(() => import("../src/pages/CategoryPage"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Toaster richColors position="top-center" />
        <Routes>
          <Route
            path="/blogs"
            element={
              <ProtectedLayout>
                <Blog />
              </ProtectedLayout>
            }
          />
          <Route
            path="/authors"
            element={
              <ProtectedLayout>
                <Author />
              </ProtectedLayout>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedLayout>
                <Category />
              </ProtectedLayout>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
