import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Members", path: "/admin/members" },
    { name: "Trainers", path: "/admin/trainers" },
    { name: "Payments", path: "/admin/payments" },
    { name: "Plans", path: "/admin/plans" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#2D336B] text-white p-5">
      <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>

      <ul className="space-y-3">
        {menu.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded-lg transition ${
                pathname === item.path
                  ? "bg-[#7886C7]"
                  : "hover:bg-[#7886C7]"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;