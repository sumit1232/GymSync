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
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Workout = () => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    day: "",
    exercises: "",
  });

  const [workouts, setWorkouts] = useState([
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
  ]);

  const openForm = () => setShowModal(true);
  const closeForm = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.day || !formData.exercises) return;

    // prevent duplicate day
    const exists = workouts.find(
      (w) => w.day.toLowerCase() === formData.day.toLowerCase()
    );

    if (exists) {
      alert("Workout for this day already exists");
      return;
    }

    setWorkouts([
      ...workouts,
      {
        day: formData.day,
        exercises: formData.exercises
          .split(",")
          .map((ex) => ex.trim())
          .filter(Boolean),
      },
    ]);

    setFormData({ day: "", exercises: "" });
    closeForm();
  };

  // Charts
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

  const workoutType = {
    labels: ["Cardio", "Strength", "Yoga"],
    datasets: [
      {
        data: [40, 40, 20],
        backgroundColor: ["#E36A6A", "#FFB2B2", "#FFF2D0"],
      },
    ],
  };

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
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="mb-4 font-semibold">Weekly Calories Burn</h2>
          <Bar data={calorieData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
          <h2 className="mb-4 font-semibold">Workout Distribution</h2>
          <div className="w-[250px]">
            <Doughnut data={workoutType} />
          </div>
        </div>
      </div>

      {/* WORKOUT LIST */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {workouts.map((item, i) => (
          <motion.div
            key={`${item.day}-${i}`}
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
      </div>

      {/* ADD BUTTON */}
      <div className="flex justify-end mt-6">
        <button
          onClick={openForm}
          className="px-6 py-2 bg-[#E36A6A] text-white rounded-lg hover:bg-[#d85d5d]"
        >
          Add Workout
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          onClick={closeForm}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-[#E36A6A] mb-6 text-center">
              Add Workout
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                placeholder="Day"
                value={formData.day}
                onChange={(e) =>
                  setFormData({ ...formData, day: e.target.value })
                }
                className="border p-3 rounded-lg"
              />

              <textarea
                placeholder="Exercises (comma separated)"
                value={formData.exercises}
                onChange={(e) =>
                  setFormData({ ...formData, exercises: e.target.value })
                }
                className="border p-3 rounded-lg"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E36A6A] text-white rounded-lg"
                >
                  Add
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Workout;