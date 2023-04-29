import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import VentanaContactos from '../components/contactos'

function Layout({children}) {
    return (
        <div className="container">
            <NavBar />
            <Notify />
            {children}
            <Modal />
        </div>
    )
}

export default Layout
