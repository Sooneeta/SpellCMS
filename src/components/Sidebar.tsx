import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiX } from "react-icons/hi";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 right-8 z-50 text-white bg-[#1abc9c] p-2 rounded-lg"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <HiX size={24} /> : <GiHamburgerMenu size={24} />}
      </button>
      <main
        className={`fixed top-0 left-0 h-full w-64 bg-[#1abc9c] flex flex-col items-center py-8 gap-24 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:min-h-screen z-40`}
      >
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
                onClick={() => setIsOpen(false)}
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
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
          >
            Logout <LuLogOut />
          </button>
        </section>
      </main>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg Wopacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
