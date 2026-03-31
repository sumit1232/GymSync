import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Members = () => {
  const [members, setMembers] = useState([]);
  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    plan: "",
    status: "",
  });
  const [showModal, setShowModal] = useState(false);

  // ================= API =================
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/members");
      setMembers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch members");
    }
  };

  const saveForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/members", userdata);
      setUserdata({ name: "", email: "", plan: "", status: "" });
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to add member");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= FORM =================
  const handleData = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  // ================= CHART LOGIC =================

  // Monthly Growth
  const growthData = useMemo(() => {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const count = Array(12).fill(0);

  members.forEach((member) => {
    if (member.createdAt) {
      const monthIndex = new Date(member.createdAt).getMonth();
      count[monthIndex]++;
    }
  });

  return {
    labels: months,
    datasets: [
      {
        label: "Member Growth",
        data: count,
        backgroundColor: "#E36A6A",
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };
}, [members]);

  // Plan Distribution
  const planData = useMemo(() => {
    const plans = { Basic: 0, Standard: 0, Premium: 0 };

    members.forEach((m) => {
      if (plans[m.plan] !== undefined) {
        plans[m.plan]++;
      }
    });

    return {
      labels: Object.keys(plans),
      datasets: [
        {
          data: Object.values(plans),
          backgroundColor: ["#E36A6A", "#FFB2B2", "#FFF2D0"],
        },
      ],
    };
  }, [members]);

  // Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#E36A6A]">
          Members Management
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg"
        >
          + Add Member
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/20">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Member</h2>

            <form onSubmit={saveForm} className="flex flex-col gap-3">
              <input
                name="name"
                value={userdata.name}
                onChange={handleData}
                placeholder="Name"
                className="border p-2 rounded"
                required
              />
              <input
                name="email"
                value={userdata.email}
                onChange={handleData}
                placeholder="Email"
                className="border p-2 rounded"
                required
              />

              <select
                name="plan"
                value={userdata.plan}
                onChange={handleData}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Plan</option>
                <option>Basic</option>
                <option>Standard</option>
                <option>Premium</option>
              </select>

              <select
                name="status"
                value={userdata.status}
                onChange={handleData}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button className="bg-[#E36A6A] text-white px-3 py-1 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <Card title="Total" value={members.length} />
        <Card
          title="Active"
          value={members.filter((m) => m.status === "Active").length}
        />
        <Card
          title="Inactive"
          value={members.filter((m) => m.status === "Inactive").length}
        />
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="mb-3 font-semibold">Member Growth</h2>
          <Bar data={growthData} options={chartOptions} />
        </div>

        <div className="bg-white p-4 rounded shadow flex flex-col items-center">
          <h2 className="mb-3 font-semibold">Plans</h2>
          <div className="w-[250px]">
            <Doughnut data={planData} />
          </div>
        </div>
      </div>


      {/* TABLE */}
      <div className="bg-white p-4 rounded shadow mt-10 overflow-x-auto">
        <h2 className="mb-4 font-semibold">Members</h2>

        <table className="w-full">
          <thead>
            <tr className="bg-[#FFF2D0]">
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {members.map((m, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{m.name}</td>
                <td>{m.email}</td>
                <td>{m.plan}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      m.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// reusable stat card
const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold text-[#E36A6A]">{value}</h2>
  </div>
);

export default Members; 