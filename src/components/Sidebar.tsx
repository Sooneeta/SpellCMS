import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const Sidebar = () => {
  const navigate = useNavigate();
  const navItems = [
    {
      path: "/blogs",
      name: "Blogs",
    },
    {
      path: "/authors",
      name: "Authors",
    },
    {
      path: "/categories",
      name: "Categories",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/", { replace: true });
  };
  return (
    <main className="min-h-screen w-64 bg-[#1abc9c] flex flex-col  items-center py-8 gap-24 ">
      <h1 className="font-[Luminari] text-2xl font-bold text-[#1B1212]">
        BLOG MANAGER
      </h1>

      <section className="flex flex-col gap-10">
        <hr className="w-48 text-white" />
        <div className="flex flex-col gap-4">
          {navItems?.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              className={({ isActive }) =>
                `py-2 pl-4 border-2 border-gray-200 ${
                  isActive
                    ? "bg-white text-[#1abc9c] font-semibold"
                    : "text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </section>

      <section className="mt-32 flex flex-col gap-4">
        <div className="flex gap-4 items-center ">
          <FaUserCircle size={32} />
          <h5 className="text-lg font-bold">Admin</h5>
        </div>
        <hr className="w-48 text-white" />
        <button
          className="text-white text-md font-semibold flex items-center gap-2 cursor-pointer"
          onClick={handleLogout}
        >
          Logout <LuLogOut />
        </button>
      </section>
    </main>
  );
};

export default Sidebar;
