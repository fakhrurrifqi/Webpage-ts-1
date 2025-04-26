// import { Toaster } from "react-hot-toast";
import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <div className="font-grotesk">
        <Toaster
          richColors
          position="top-center"
          // toastOptions={{
          //   style: {
          //     borderRadius: "8px",
          //     background: "#333",
          //     color: "#fff",
          //   },
          // }}
        />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
