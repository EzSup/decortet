import './Snackbar.css';
import ReactDOMServer from 'react-dom/server';
import { Warning, CheckFat } from '@phosphor-icons/react';


export default function Snackbar() {
    return (
        <div id="snackbar">
            <span id='snackbar-symbol'></span>
            <p id='snackbar-message'></p>
        </div>
    );
}

const renderIcon = (icon: React.ReactNode) => {
    return ReactDOMServer.renderToStaticMarkup(icon);
};

export function ShowSnackbar(message:string, success:boolean){
    const snackbar = document.getElementById('snackbar');
    const messageItem = document.getElementById('snackbar-message');
    const symbolItem = document.getElementById('snackbar-symbol');
    if(snackbar && messageItem && symbolItem){
        symbolItem.innerHTML = success ?  renderIcon(<CheckFat size={24} weight='bold' />) : renderIcon(<Warning size={24}/>);
        messageItem.textContent = message;
        snackbar.style.backgroundColor = success ? "#4A9C80" : "#f95959"; 
        snackbar.style.opacity = '1';
        setTimeout(() => {
            snackbar.style.opacity = '0';
        }, 2000); 
    }    
}