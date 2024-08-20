import { Product } from '../models/productModels';
import { addToCart } from '../services/cartService';
import './PlantCard.css'
import { Heart} from "@phosphor-icons/react";

interface PlantCardProps{
    data: Product;
    key:number;
}

export default function PlantCard({data} : PlantCardProps) {
    

    return(
        <div className='card'>
            <img src={data.photoLinks == undefined ? '' : data.photoLinks[0]} alt={data.name}/>
            <h5>{data.name}</h5>
            <h6>{data.underheader}</h6>
            <div id='buttons-row'>
                <p>{data.price}$</p>
                <button id='buy' onClick={() => addToCart(data)}>В кошик</button>
                <button id='save'><Heart size={14} weight='light' color='#f95959' /></button>
            </div>
        </div>
    )
}