import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Snackbar from "./components/Snackbar.tsx";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Snackbar />
		<App />
		{/* <RouterProvider router={router} /> */}
	</React.StrictMode>
);
