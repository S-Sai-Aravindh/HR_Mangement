import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterComp from './FooterComp'
import NavComp from './NavComp';

const MainDashboard = () => {
  return (
    <div className='container'>
        <div className='card border-primary'>
            <div className='card-header border-primary'>
                <NavComp/>
            </div>
            <div className='card-body border-primary'>
            <Outlet/>
            </div>
            <div className='card-footer border-primary'>
                <FooterComp/>
            </div>
        </div>
    </div>
  )
}

export default MainDashboard