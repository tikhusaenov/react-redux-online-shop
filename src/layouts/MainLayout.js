import React from 'react'
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = props => {
    return (
        <div>
            <Header {...props}/>
            <div className="main">
                {props.children}
            </div>
            <Footer/>
        </div>
    )
}

export default MainLayout