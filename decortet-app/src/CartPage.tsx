import CartItem from './components/CartItem';
import './Index.css'
import './CartPage.css'
import { clearCart, getCart } from './services/cartService';
import { ProductWithCount } from './models/productModels';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface OrderData{
    Name?:string,
    Phone?:string,
    Email?:string,
    Region?:string,
    City?:string,
    Street?:string,
    StreetNum?:string,
    Description?:string,
    productWithCounts?:ProductWithCount[]
}

export default function CartPage(){
    const [cartItems, setCartItems] = useState<ProductWithCount[]>(getCart());
    const [sum, setSum] = useState<number>(calculateSum(cartItems));
    const [showForm, setShowForm] = useState<boolean>(false);
    const [formData, setFormData] = useState<OrderData>();

    useEffect(() => {
        setShowForm(cartItems.length > 0)
    }, [cartItems]);

    function calculateSum(items: ProductWithCount[]): number {
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }

    const updateSum = () => {
        setSum(calculateSum(getCart()));
    };


    // Обробник змін полів
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Обробник надсилання форми
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(formData){
            formData.productWithCounts = cartItems;
        }        
        axios.post(`https://localhost:32768/User/Buy`, formData)
        .then((response: AxiosResponse) => {
          if(response.status === 200){
            clearCart();
          }
        });
        // Тут можна відправити дані на сервер або виконати інші дії
    };

    return(
        <>
            <div id='page'>  
                <div id='cart-container'>
                    <CartContainer  cartItems={cartItems} onCartUpdate={updateSum}/>
                </div> 
                <div id='form-container' style={{display: showForm ? 'block' : 'none'}}>
                    <h2>Форма замовлення</h2>
                    <form onSubmit={handleSubmit}>
                        <h4>Ваші дані</h4>
                        <input type='text' name='Name' placeholder="Ім'я" value={formData?.Name} onChange={handleChange}/>
                        <input type='phone' name='Phone' placeholder="Телефон" value={formData?.Phone} onChange={handleChange}/>
                        <input type='email' name='Email' placeholder="Email" value={formData?.Email} onChange={handleChange}/>
                        <h4>Дані доставки</h4>
                        <input type='text' name='Region' placeholder='Область' value={formData?.Region} onChange={handleChange}/>
                        <input type='text' name='City' placeholder='Місто' value={formData?.City} onChange={handleChange}/>
                        <input type='text' name='Street' placeholder='Вулиця' value={formData?.Street} onChange={handleChange}/>
                        <input type='text' name='StreetNum' placeholder='Номер вулиці' value={formData?.StreetNum} onChange={handleChange}/>
                        <input type='text' name='Description' placeholder='Примітка' value={formData?.Description} />
                        <p><strong>До сплати: </strong>{sum}₴</p>
                        <p><i>Увага! Оплата замовлення здійснюється <strong>лише готівкою при отриманні!</strong></i></p>
                        <button type='submit'>Замовити</button>
                    </form>                    
                </div> 
            </div>
        </> );
}

function CartContainer({cartItems, onCartUpdate} : {cartItems: ProductWithCount[], onCartUpdate: () => void}){
    if(cartItems.length == 0){
        return(
            <div style={{textAlign: "center"}}>            
                <h2>Корзина пуста!</h2>
                <h3><a href='/#catalog'>Повернутися до каталогу.</a></h3>
            </div>
        )
    }
    else{
        return(
            <>
            {cartItems.map(item => (
                    <CartItem data={item} key={item.product.id} onQuantityChange={onCartUpdate}/>
                ))} 
            </>
        )
    }
}