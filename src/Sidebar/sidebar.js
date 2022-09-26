import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { FaSyringe, FaFolder } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { ImLab } from "react-icons/im";
import { IconButton } from '@material-ui/core'

import './sidebar.css'

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  overflow-y: auto;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 800ms;
  z-index: 10;
`

const SidebarWrap = styled.div`
  width: 100%;
  margin-top: 80px;
`
const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(true)


  return (
    
    <>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <div className='nav-header'>Cijepi se</div>
            {props.user.uloga == 'doktor'
              ? <><li><NavLink className='link' activeClassName="active" to="/"><FaIcons.FaHourglassHalf/>ㅤNa čekanju</NavLink></li>
              <li><NavLink className='link' activeClassName="active" to="/booked"><FaIcons.FaRegClipboard/>ㅤNaručeni</NavLink></li>
              <li><NavLink className='link' activeClassName="active" to="/vaccinated"><FaSyringe/>ㅤCijepljeni</NavLink></li>
              <li><NavLink className='link' activeClassName="active" to="/testing"><ImLab/>ㅤTestiranje</NavLink></li>
              <li><NavLink className='link' activeClassName="active" to="/testing_history"><FaFolder/>ㅤPovijest testiranja</NavLink></li></>
              : <>
              <li><NavLink className='link' activeClassName="active" to="/profile"><FaIcons.FaUser/>ㅤProfil</NavLink></li>
              <li><NavLink className='link' activeClassName="active" to="/testing_patient"><ImLab/>ㅤTestiranje</NavLink></li>
             </>
              }
            {props.user !== null ? (
              <IconButton
                className='sidebarBtn'
                color='primary'
                onClick={props.logOut}
              >
                <BiLogOut/>
                </IconButton>
             
            ) : (
              ''
            )}
          </SidebarWrap>
        </SidebarNav>
    </>
  )
}

export default Sidebar