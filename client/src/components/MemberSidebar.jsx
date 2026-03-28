import { Link, useLocation } from "react-router-dom";

const MemberSidebar = () => {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/member/dashboard" },
    { name: "Profile", path: "/member/profile" },
    { name: "Workout", path: "/member/workout" },
    { name: "Attendance", path: "/member/attendance" },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#E36A6A] text-white p-5">
      <h2 className="text-2xl font-bold mb-8 text-center">Member Panel</h2>

      <ul className="space-y-3">
        {menu.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded-lg transition ${
                pathname === item.path
                  ? "bg-[#FFB2B2]"
                  : "hover:bg-[#FFB2B2]"
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

export default MemberSidebar;