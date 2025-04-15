import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { currentUser } = useAuth();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good Evening";
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6 dark:bg-slate-700">
        <h1 className="text-3xl text-gray-700 dark:text-gray-100">
          Welcome to your Dashboard
        </h1>
        {currentUser && (
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-100">
            {greeting},{" "}
            <strong className="text-indigo-600 dark:text-indigo-300">
              {currentUser.name ?? currentUser.email}
            </strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
