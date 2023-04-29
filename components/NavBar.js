import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'
import MiniCartWidget from './widget/minicart'
import { hostname } from 'os'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function NavBar() {
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { auth, cart } = state
    const [isOpen, setIsOpen] = useState(true)
    const [search, setSearch] = useState("");


    let locationProtocol;

    useEffect(() => {
        const btnMobile = document.querySelectorAll('.nav-item-mobile');
        const dropdownMobile = window.document.querySelector('#navbarNavDropdown');

        dropdownMobile.classList.remove('show');


        setIsOpen(false)

    }, [isOpen])

    const handleOpenMenu = (e) => {
        console.log("HELLO DEBUG");
        const dropdownMobile = window.document.querySelector('#navbarNavDropdown');
        console.log(dropdownMobile)
        if (dropdownMobile.style.display === "none") {
            dropdownMobile.style.display = "flex";
            return;
        }
        dropdownMobile.style.display = "none";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`tienda/?search=${search}`)
    }

    let abrirNav = () => {

        setIsOpen(true)
    }
    const isActive = (r) => {
        if (r === router.pathname) {
            return " active"
        } else {
            return ""
        }
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' })
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
        dispatch({ type: 'NOTIFY', payload: { success: '¡Cerraste tu sesión correctamente!' } })
        return router.push('/')
    }

    const adminRouter = () => {
        return (
            <>
                <Link href="/users">
                    <a className="dropdown-item">Usuario</a>
                </Link>
                <Link href="/create">
                    <a className="dropdown-item">Productos</a>
                </Link>
                <Link href="/createNov">
                    <a className="dropdown-item">Novedades</a>
                </Link>
                <Link href="/categories">
                    <a className="dropdown-item">Categorias</a>
                </Link>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <li className="nav-item dropdown usermenu">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={auth.user.avatar} alt={auth.user.avatar}
                        style={{
                            borderRadius: '50%', width: '30px', height: '30px',
                            transform: 'translateY(-3px)', marginRight: '3px'
                        }} /> {auth.user.name}
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href="/profile">
                        <a className="dropdown-item">Perfil</a>
                    </Link>
                    {
                        auth.user.role === 'admin' && adminRouter()
                    }
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleLogout}>Salir</button>
                </div>
            </li>
        )
    }

    return (
        <header>
            <MiniCartWidget count={cart.length} />
            <nav className="links-list d-none d-lg-flex d-xl-flex">

                <ul className="" >

                    <li className="nav-item">
                        <Link className="text-center" href="/">
                            <a className=" text-center">
                                <img src={hostname() + `/../../images/logo.png`} className="logo" layout="intrinsic" alt='logo-access' />
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/nosotros">
                            <a style={{ color: 'black' }} className={"nav-link" + isActive('/nosotros')}>
                                Nosotros
                            </a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link href="/tienda">
                            <a style={{ color: 'black' }} className={"nav-link" + isActive('/')}>
                                Tienda
                            </a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link href="/servicios">
                            <a className={"nav-link" + isActive('/servicios')}>
                                Servicios
                            </a>
                        </Link>
                    </li>

                </ul>

                <ul className="navbar-nav social-collapse p-1">
                    {
                        Object.keys(auth).length === 0
                            ? <li className="nav-item">
                                <Link href="/signin">
                                    <a style={{ color: 'black' }} className={"userSignAvatar nav-link" + isActive('/signin')}>
                                        <img src={hostname() + `/../icons/icon-user.svg`} aria-hidden="true" />
                                        Iniciar Sesión
                                    </a>
                                </Link>
                            </li>
                            : loggedRouter()
                    }

                    <li>

                        <div className='contenedor-form-search desktop'>
                            <FontAwesomeIcon icon={faMagnifyingGlass}
                                style={{
                                    color: 'black',
                                    width: '25px',
                                    height: '25px',
                                    position: 'absolute',
                                    marginLeft: '1rem',
                                    top: '3.4rem'
                                }}>

                            </FontAwesomeIcon>
                            <form onSubmit={handleSubmit} autoComplete="off" className="nav-buscador-artic">
                                <label>
                                    <input type="text" placeholder='Búsqueda' className="form-control placeholder-busqueda"
                                        onChange={(e) => setSearch(e.target.value)} />
                                </label>

                            </form>
                        </div>
                    </li>

                    <li>

                    </li>

                </ul>

            </nav>



            <nav className='short-menu'>
                <ul>
                    <li className="nav-item">
                        <Link className="text-center" href="/">
                            <a className=" text-center">
                                <img src={hostname() + `/../../images/logo.png`} className="logo" layout="intrinsic" alt='logo-access' />
                            </a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <button className='button-toggler' onClick={e => handleOpenMenu(e)}>
                            <span className='button-toggler__line'></span>
                            <span className='button-toggler__line'></span>
                            <span className='button-toggler__line'></span>
                        </button>
                    </li>
                </ul>
            </nav>
            <nav className='links-list-vertical collapse navbar-collapse justify-content-end' id="navbarNavDropdown" style={{ display: 'none' }}>
                <ul className="" >
                    <li className="nav-item nav-item-mobile" >
                        <Link href="/nosotros">
                            <a style={{ color: 'white' }} onClick={abrirNav} className={"nav-link" + isActive('/nosotros')}>
                                NOSOTROS
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item nav-item-mobile">
                        <Link href="/sucursales">
                            <a style={{ color: 'white' }} onClick={abrirNav} className={"nav-link" + isActive('/sucursales')}>
                                SUCURSALES
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item nav-item-mobile">
                        <Link href="/servicios">
                            <a style={{ color: 'white' }} onClick={abrirNav} className={"nav-link" + isActive('/servicios')}>
                                SERVICIOS
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item nav-item-mobile">
                        <Link href="/novedades">
                            <a style={{ color: 'white' }} onClick={abrirNav} className={"nav-link" + isActive('/novedades')}>
                                NOVEDADES
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item nav-item-mobile">
                        <Link href="/">
                            <a style={{ color: 'white' }} onClick={abrirNav} className={"nav-link" + isActive('/')}>
                                TIENDA VIRTUAL
                            </a>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <div className='contenedor-form-search'>
                            <form onSubmit={handleSubmit} autoComplete="off" className="nav-buscador-artic">
                                <label>
                                    <input type="text" placeholder='Buscá tu producto' className="form-control"
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </label>
                            </form>
                        </div>
                    </li>
                    {
                        Object.keys(auth).length === 0
                            ? <li className="nav-item">
                                <Link href="/signin">
                                    <a style={{ color: 'white' }} className={"login nav-link" + isActive('/signin')}>
                                        <img src={hostname() + `/../../icons/user.svg`} /> Ingresar
                                    </a>
                                </Link>
                            </li>
                            : loggedRouter()
                    }
                    <ul className="social-collapse">
                        <li className='icono-redes'>
                            <a href="#face" target="_blank"><img src='images/iconos-redes1.png' alt="iconos-redes" /></a>
                        </li>
                        <li className='icono-redes'>
                            <a href="#whatsapp" target="_blank"><img src='images/iconos-redes2.png' alt="iconos-redes" /></a>
                        </li>
                        <li className='icono-redes'>
                            <a href="#instagram" target="_blank"><img src='images/iconos-redes3.png' alt="iconos-redes" /></a>
                        </li>
                    </ul>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar
