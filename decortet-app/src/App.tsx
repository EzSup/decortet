import "./App.css";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import Index from "./Index";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminPage from "./admin/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import CartPage from "./pages/CartPage";
import Orders from "./admin/Orders";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Index />} />
					<Route path="cart" element={<CartPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Route>
				<Route path="/admin/" element={<AdminLayout />}>
					<Route index element={<AdminPage />} />
					<Route path="/admin/orders/" element={<Orders />} />
				</Route>
			</Route>
		)
	);

	return <RouterProvider router={router} />;
}

export default App;
