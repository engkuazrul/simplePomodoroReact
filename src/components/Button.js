import { Component } from "react";

const Button = ({icon, onClick}) => {
    return (
        <a className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black ml2" href="#0" onClick={onClick}>{icon}</a>
    )
}

export default Button;