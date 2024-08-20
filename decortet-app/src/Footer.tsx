import { InstagramLogo, FacebookLogo, YoutubeLogo,  Envelope } from '@phosphor-icons/react'
import './Footer.css'


export default function Footer(){
    return(
        <footer id='footer'>
            <div><strong>Контакти</strong><br/>
                Пошта: opmystore@gmail.com<br/>
                Адреса: м. Луцьк
            </div>
            <div style={{display: "flex"}}><img style={{margin: "auto"}} src='../src/assets/logo-nobg.svg' width={70}/></div>
            <div id='footer-links'>
                <a href='https://www.instagram.com/decortetstore/' target='_blank'>
                    <InstagramLogo size={40}/>     
                </a>
                <a target='_blank'>
                    <FacebookLogo size={40} /> 
                </a>
                <a target='_blank'>
                    <YoutubeLogo size={40} /> 
                </a>
                <a target='_blank'>
                    <Envelope size={40}/>      
                </a>
                
            </div>
        </footer>
    )
}
