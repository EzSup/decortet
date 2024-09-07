import { useEffect, useState } from "react";
import "./Index.css";
import PlantCard from "./components/PlantCard";
import {
	Truck,
	CurrencyCircleDollar,
	ClockClockwise,
	InstagramLogo,
} from "@phosphor-icons/react";
import { Product } from "./models/productModels";
import axios, { AxiosResponse } from "axios";

function Index() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			axios.get(`/api/User/Get`).then((response: AxiosResponse<Product[]>) => {
				setProducts(response.data);
			});
		};

		fetchProducts();
	}, []);

	return (
		<div style={{ fontFamily: '"Montserrat", sans-serif' }}>
			<section id="header" className="header m-0 content-center justify-center">
				<div className="header-content">
					<h1>
						<img
							src="../src/assets/logo-nobg.svg"
							width={70}
							style={{ marginBottom: "-10px", marginRight: "-5px" }}
						/>
						ecortet
					</h1>
					<h2>Планета декору</h2>
					<h3>Декор ручної роботи для вашого простору</h3>
				</div>
			</section>
			<section id="catalog">
				<div className="mentions-container">
					<div className="mention">
						<Truck size={22} /> Доставка новою поштою
					</div>
					<div className="mention">
						<CurrencyCircleDollar size={22} /> Оплата при отриманні
					</div>
					<div className="mention">
						<ClockClockwise size={22} /> Швидкий сервіс
					</div>
				</div>
				<div className="mentions-container">
					{products.map((product) => (
						<PlantCard data={product} key={product.id ?? 1} />
					))}
				</div>
			</section>
			<h4 id="images-header">
				<strong>#decortet</strong>
				<InstagramLogo size={24} /> Instagram
			</h4>
			<section id="images">
				<div id="images-container" className="mentions-container">
					<img src="https://res.cloudinary.com/dwexahbqo/image/upload/v1723362932/decortet/yx0wljd3dlaigvljytww.png" />
					<img src="https://res.cloudinary.com/dwexahbqo/image/upload/v1723362932/decortet/cg4pxlbltbancvgtndmo.png" />
					<img src="https://res.cloudinary.com/dwexahbqo/image/upload/v1723362932/decortet/aud3hspzliwaezjvwnfe.png" />
					<img src="https://res.cloudinary.com/dwexahbqo/image/upload/v1723362932/decortet/b6bpyc2yje2yi1e14wyo.png" />
					<img src="https://res.cloudinary.com/dwexahbqo/image/upload/v1723362932/decortet/qzh1xz7wnjmhlpbgfuwp.png" />
					<img src="https://res.cloudinary.com/dwexahbqo/image/upload/v1723362932/decortet/x6nr4l5wooh8rissxbad.png" />
				</div>
			</section>
		</div>
	);
}

export default Index;
