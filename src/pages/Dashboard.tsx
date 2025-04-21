import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/fetchUserProfile";
import Navbar from "../components/Navbar";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const {
    data: userProfile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile", currentUser?.uid],
    queryFn: () => fetchUserProfile(currentUser!.uid),
  });

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good Evening";
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="animate-pulse text-lg text-gray-500 dark:text-gray-300">
          Loading...
        </p>
      </div>
    );

    if (error) return <p>Error: {(error as Error).message}</p>;
  }
  return (
    <div>
      <Navbar />
      <div className="bg-background flex min-h-screen flex-col items-center justify-center p-6">
        <h1 className="text-foreground text-3xl">Welcome to your Dashboard</h1>
        <p className="mt-4 text-xl">
          {greeting},{" "}
          <strong className="text-accent-foreground">
            {userProfile?.name ? userProfile?.name : userProfile?.email}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
