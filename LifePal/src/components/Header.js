import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./Header.css"

const Header = () => {
    const[activeTab, setActiveTab] = useState("Home");
    const location = useLocation();

    useEffect(()=>{
        if (location.pathname ==="/") {
            setActiveTab("Home");
        } else if (location.pathname === "/add") {
            setActiveTab("AddContact");
        }
    }, [location]); //para que cambie el color de los botones del header cuando se cambia de pagina manualmente en el url
    return (
        <div className="header">
            <p className="logo">LifePal</p>
            <div className="header-right">
                <Link to ="/">
                    <p className={`${activeTab === "Home" ? "active" : ""}`}
                    onClick={() => setActiveTab("Home")}>
                        Home
                    </p>
                </Link>
                <Link to ="/add">
                    <p className={`${activeTab === "AddContact" ? "active" : ""}`}
                    onClick={() => setActiveTab("AddContact")}>
                        Add Contact
                    </p>
                </Link>
            </div>

        </div>
  )
}

export default Header