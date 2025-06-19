import { useEffect, useState } from "react";
import axios from "axios";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000", {
        withCredentials: true,
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
