import { useState, useEffect } from "react";
import { Product, ProductWithCount } from "../models/productModels"
import './CartItem.css'
import { X, Plus, Minus } from "@phosphor-icons/react";
import { addToCart, decreaseQuantity, increaseQuantity, removeItem } from "../services/cartService";

interface CartCardProps{
    data: ProductWithCount;
    key:number;
    onQuantityChange: () => void;
}


export default function CartItem({data, onQuantityChange} : CartCardProps){
    const [quantity, setQuantity] = useState(data.quantity);
    const [amount, setAmount] = useState(data.product.price * quantity);
    const id = `product-${data.product.id}`

    useEffect(() => {
        setAmount(quantity * data.product.price);
        onQuantityChange();
    }, [quantity]);

    function changeQuantity(increment: boolean){
        let newQuantity = increment ? quantity+1 : quantity-1;
        if(increment){
            increaseQuantity(data.product)
        }
        else{
            decreaseQuantity(data.product);
        }
        
        setQuantity(newQuantity);
        setAmount(newQuantity * data.product.price);
    }

    function removeProduct(idParam:number){
        removeItem(idParam);      
        const card = document.getElementById(`${id}`);
        if(card)
        {
            card.style.display = 'none';
        }
        onQuantityChange();
    }

    return (
        <div className="cart-item" id={id}>      
            <img src={data.product.photoLinks[0]}/>
            <div style={{display:"inline-block"}}>                     
                <p><strong>{data.product.name}</strong></p>
                <p><strong><i>Ціна: </i></strong>{data.product.price}₴</p>
                <p><strong><i>Вартість: </i></strong>{amount}₴</p>
                <div id="quantity-block">
                    <button onClick={() => changeQuantity(false)}><Minus  size={20}/></button>
                    <input type="text" value={quantity} style={{width: "20px"}} readOnly/>
                    <button onClick={() => changeQuantity(true)}><Plus size={20}/></button>
                </div>                
            </div> 
            <button id="x-button" onClick={() => removeProduct(data.product.id)}><X size={16} weight="bold"/></button>
        </div>
    );
}
