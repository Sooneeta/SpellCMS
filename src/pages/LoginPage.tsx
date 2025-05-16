import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema } from "../types/form.d";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  if (token) {
    return <Navigate to={"/blogs"} replace />;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof authFormSchema>) => {
      const { email, password } = data;
      if (email === "blogmanager@gmail.com" && password === "blogmanager123") {
        localStorage.setItem("authToken", "admin");
        return true;
      } else {
        throw new Error("Invalid credentials!");
      }
    },
    onSuccess: () => {
      toast.success("Login successful!");
      navigate("/blogs");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof authFormSchema>) => {
    mutation.mutate(values);
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="flex flex-col gap-10 justify-center w-[30%] border-2 border-[#1abc9c] py-24 rounded-md">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-bold text-[#1abc9c]">
            Welcome to Blog Manager
          </h1>
          <h4>Login into your account to continue</h4>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 items-center"
        >
          <div className="flex items-center border-2 border-[#1abc9c] w-72 p-2 gap-4 ">
            <MdEmail size={24} />
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              {...register("email")}
              className="focus:outline-none"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="flex items-center border-2 border-[#1abc9c] p-2 w-72 gap-4">
            <RiLockPasswordFill size={24} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="off"
              {...register("password")}
              className="focus:outline-none"
            />
            {showPassword ? (
              <IoEye onClick={() => setShowPassword(!showPassword)} size={24} />
            ) : (
              <IoMdEyeOff
                onClick={() => setShowPassword(!showPassword)}
                size={24}
              />
            )}
          </div>
          <button
            type="submit"
            className="w-64 bg-[#1abc9c] text-white text-xl font-semibold py-2 rounded-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
