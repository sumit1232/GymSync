import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const Attendance = () => {
  const [showModal, setShowModal] = useState(false);
  const [attendanceData, setAttendanceData] = useState({
    totalDays: 30,
    presentDays: [1,2,3,5,6,8,10,12,13,15,16,18,20,22,23,25,26,28],
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example: updating present days from comma-separated input
    const updatedPresentDays = e.target.presentDays.value
      .split(",")
      .map((d) => parseInt(d.trim()))
      .filter((d) => d > 0 && d <= attendanceData.totalDays);
    setAttendanceData({ ...attendanceData, presentDays: updatedPresentDays });
    closeModal();
  };

  // Charts data
  const trendData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Days Attended",
        data: [5, 6, 5, 6],
        borderColor: "#E36A6A",
        backgroundColor: "#FFB2B2",
        fill: true,
      },
    ],
  };

  const summaryData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [
          attendanceData.presentDays.length,
          attendanceData.totalDays - attendanceData.presentDays.length,
        ],
        backgroundColor: ["#E36A6A", "#FFF2D0"],
      },
    ],
  };

  const days = Array.from({ length: attendanceData.totalDays }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">
      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-[#E36A6A]"
      >
        Attendance Tracker
      </motion.h1>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Total Days", value: attendanceData.totalDays },
          { title: "Present", value: attendanceData.presentDays.length },
          { title: "Absent", value: attendanceData.totalDays - attendanceData.presentDays.length },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-gray-600">{item.title}</h3>
            <p className="text-2xl font-bold text-[#E36A6A] mt-2">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">Weekly Attendance Trend</h2>
          <Line data={trendData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-4">Attendance Summary</h2>
          <div className="w-[250px]">
            <Doughnut data={summaryData} />
          </div>
        </motion.div>
      </div>

      {/* CALENDAR */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-[#FFF2D0] p-6 rounded-xl shadow-md mt-10"
      >
        <h2 className="text-lg font-semibold text-[#E36A6A] mb-4">Monthly Attendance</h2>

        <div className="grid grid-cols-7 gap-3">
          {days.map((day) => {
            const isPresent = attendanceData.presentDays.includes(day);
            return (
              <div
                key={day}
                className={`p-3 text-center rounded-lg font-medium ${
                  isPresent ? "bg-[#E36A6A] text-white" : "bg-white text-gray-600"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* LEGEND */}
        <div className="flex gap-6 mt-6">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#E36A6A] rounded-full"></span>
            <span>Present</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-white border rounded-full"></span>
            <span>Absent</span>
          </div>
        </div>

        {/* EDIT BUTTON */}
        <div className="flex justify-end mt-4">
          <button
            onClick={openModal}
            className="px-6 py-2 bg-[#E36A6A] text-white rounded-lg hover:bg-[#d85d5d] transition"
          >
            Edit Attendance
          </button>
        </div>
      </motion.div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-[#E36A6A] mb-6 text-center">
              Edit Attendance
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <textarea
                name="presentDays"
                placeholder="Present Days (comma separated, e.g., 1,2,3)"
                defaultValue={attendanceData.presentDays.join(",")}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
                required
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#E36A6A] hover:bg-[#d85d5d] text-white transition font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Attendance;