// src/pages/member/Workout.jsx
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Workout = () => {
  // 📊 Calories Burn Chart
  const calorieData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Calories Burned",
        data: [300, 450, 400, 500, 550, 600],
        backgroundColor: "#E36A6A",
      },
    ],
  };

  // 📊 Workout Type Distribution
  const workoutType = {
    labels: ["Cardio", "Strength", "Yoga"],
    datasets: [
      {
        data: [40, 40, 20],
        backgroundColor: ["#E36A6A", "#FFB2B2", "#FFF2D0"],
      },
    ],
  };

  // 📋 Workout List
  const workouts = [
    {
      day: "Monday",
      exercises: ["Running (20 min)", "Push-ups (3x15)", "Plank (3x30s)"],
    },
    {
      day: "Tuesday",
      exercises: ["Cycling (30 min)", "Squats (3x20)", "Lunges (3x15)"],
    },
    {
      day: "Wednesday",
      exercises: ["Yoga (40 min)", "Stretching", "Meditation"],
    },
    {
      day: "Thursday",
      exercises: ["Treadmill (25 min)", "Bench Press (3x12)", "Pull-ups"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-[#E36A6A]"
      >
        Workout Plan
      </motion.h1>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Calories Burned", value: "2800 kcal" },
          { title: "Workout Days", value: "6 Days" },
          { title: "Avg Time", value: "45 min" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-gray-600">{item.title}</h3>
            <p className="text-2xl font-bold text-[#E36A6A] mt-2">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">

        {/* CALORIES */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">
            Weekly Calories Burn
          </h2>
          <Bar data={calorieData} />
        </motion.div>

        {/* WORKOUT TYPE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-4">
            Workout Distribution
          </h2>
          <div className="w-[250px]">
            <Doughnut data={workoutType} />
          </div>
        </motion.div>
      </div>

      {/* WORKOUT LIST */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-10 grid md:grid-cols-2 gap-6"
      >
        {workouts.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-[#FFF2D0] p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold text-[#E36A6A]">
              {item.day}
            </h3>

            <ul className="mt-3 space-y-2 text-gray-700">
              {item.exercises.map((ex, idx) => (
                <li key={idx}>• {ex}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};

export default Workout;