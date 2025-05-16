import { NavLink } from "react-router-dom";

const Sidebar = () => {
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
    </main>
  );
};

export default Sidebar;
