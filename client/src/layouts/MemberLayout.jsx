import { Outlet } from "react-router-dom";
import MemberSidebar from "../components/MemberSidebar";

const MemberLayout = () => {
  return (
    <div className="flex">
      <MemberSidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;