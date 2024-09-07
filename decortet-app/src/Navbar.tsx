import "./Navbar.css";
import {
	ShoppingCart,
	House,
	Storefront,
	NotePencil,
} from "@phosphor-icons/react";
//import {  getCartItemsCount } from './services/cartService';

export default function Navbar() {
	//const cartItems = getCartItemsCount();

	return (
		<div className="my-navbar">
			<img
				src="src/assets/logo-nobg.svg"
				style={{ width: "40px", margin: "-7px 0 0 0" }}
			/>
			<a href="/#header" className="pc-version">
				Головна
			</a>
			<a href="/#catalog" className="pc-version">
				Каталог
			</a>
			<a href="/#footer" className="pc-version">
				Контакти
			</a>
			<a href="/admin" className="pc-version">
				Адмін
			</a>
			<a href="/#header" className="mobile-version">
				<House size={24} />
			</a>
			<a href="/#catalog" className="mobile-version">
				<Storefront size={24} />
			</a>
			<a href="/#footer" className="mobile-version">
				<NotePencil size={24} />
			</a>
			<a href="/cart">
				<ShoppingCart size={24} />
			</a>
			{/* <User size={24}  /> */}
		</div>
	);
}

function updateNavbarTextColor() {
	const header = document.getElementById("header");
	const navbar = document.querySelector(".my-navbar");
	if (header == undefined) {
		navbar?.classList.remove("light-text");
		navbar?.classList.add("dark-text");
	}
	const headerPosition = header?.getBoundingClientRect().bottom;
	const navbarPosition = navbar?.getBoundingClientRect().top;
	if (navbarPosition != undefined && headerPosition != undefined) {
		if (navbarPosition > headerPosition - 50) {
			navbar?.classList.remove("light-text");
			navbar?.classList.add("dark-text");
		} else {
			navbar?.classList.remove("dark-text");
			navbar?.classList.add("light-text");
		}
	}
}

window.addEventListener("load", updateNavbarTextColor);
window.addEventListener("scroll", updateNavbarTextColor);
