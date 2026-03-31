// src/pages/admin/Reports.jsx
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const Reports = () => {
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);

  // ================= API =================
  const fetchData = async () => {
    try {
      const [mRes, pRes] = await Promise.all([
        axios.get("http://localhost:3000/memberGrowth"),
        axios.get("http://localhost:3000/payments"),
      ]);

      setMembers(mRes.data);
      setPayments(pRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load reports data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= HELPERS =================
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  // ================= REVENUE =================
  const revenueData = useMemo(() => {
    const monthly = Array(12).fill(0);

    payments.forEach((p) => {
      if (p.createdAt && p.status === "Paid") {
        const m = new Date(p.createdAt).getMonth();
        monthly[m] += Number(p.amount) || 0;
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: "Revenue ₹",
          data: monthly,
          backgroundColor: "#E36A6A",
        },
      ],
    };
  }, [payments]);

  // ================= MEMBER GROWTH =================
  const memberGrowth = useMemo(() => {
    const monthly = Array(12).fill(0);

    members.forEach((m) => {
      if (m.createdAt) {
        const month = new Date(m.createdAt).getMonth();
        monthly[month]++;
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: "Members",
          data: monthly,
          borderColor: "#E36A6A",
          backgroundColor: "#FFB2B2",
          fill: true,
        },
      ],
    };
  }, [members]);

  // ================= ATTENDANCE =================
  const attendanceData = useMemo(() => {
    const active = members.filter((m) => m.status === "Active").length;
    const inactive = members.length - active;

    return {
      labels: ["Active", "Inactive"],
      datasets: [
        {
          data: [active, inactive],
          backgroundColor: ["#E36A6A", "#FFF2D0"],
        },
      ],
    };
  }, [members]);

  // ================= STATS =================
  const totalRevenue = useMemo(() => {
    return payments
      .filter((p) => p.status === "Paid")
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  }, [payments]);

  const totalMembers = members.length;

  const attendanceRate = totalMembers
    ? Math.round(
        (members.filter((m) => m.status === "Active").length / totalMembers) * 100
      )
    : 0;

  // simple growth %
  const growthRate = useMemo(() => {
    const currentMonth = new Date().getMonth();

    const current = members.filter(
      (m) =>
        new Date(m.createdAt).getMonth() === currentMonth
    ).length;

    const prev = members.filter(
      (m) =>
        new Date(m.createdAt).getMonth() === currentMonth - 1
    ).length;

    if (!prev) return 0;

    return Math.round(((current - prev) / prev) * 100);
  }, [members]);

  // ================= UI =================
  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#E36A6A]">
          Reports & Analytics
        </h1>

        <button className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg">
          Export Report
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mt-6">
        <Card title="Total Revenue" value={`₹${totalRevenue}`} />
        <Card title="Total Members" value={totalMembers} />
        <Card title="Attendance Rate" value={`${attendanceRate}%`} />
        <Card title="Growth Rate" value={`${growthRate}%`} />
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">Monthly Revenue</h2>
          <Bar data={revenueData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">Member Growth</h2>
          <Line data={memberGrowth} />
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
          <h2 className="mb-4 font-semibold">Attendance</h2>
          <div className="w-[250px]">
            <Doughnut data={attendanceData} />
          </div>
        </div>

        <div className="bg-[#FFF2D0] p-6 rounded-xl shadow">
          <h2 className="text-[#E36A6A] font-semibold">Insights</h2>

          <ul className="mt-4 space-y-2">
            <li>• Revenue is dynamic from payments</li>
            <li>• Growth based on real member data</li>
            <li>• Attendance uses active/inactive</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

// reusable card
const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold text-[#E36A6A]">{value}</h2>
  </div>
);

export default Reports;