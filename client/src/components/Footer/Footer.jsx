import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='footer'>
        <div>
            <p>Desarrollado por Ignacio Veiga</p>
            <p>Marzo de 2022</p>
        </div>
        <Link to='/orders'>Acceso Administradores</Link>
    </div>
  )
}
