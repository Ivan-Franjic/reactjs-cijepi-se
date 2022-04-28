//import React, { useState, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa'
import { FaPills } from "react-icons/fa";
import { FaComments } from "react-icons/fa";

export const SidebarData = [
  {
    title: 'Na cekanju',
    path: '/',
    icon: <FaIcons.FaRegClipboard />,
  },

  {
    title: 'Naruceni',
    path: 'naruceni',
    icon: <FaIcons.FaRegClipboard />,
  },

  {
    title: 'Cijepljeni',
    path: '/cijepljeni',
    icon: <FaPills />,
  },
  {
    title: 'Testiranje',
    path: '/testiranje',
    isLoged: false,
    icon: <FaComments />,
  },
  {
    title: 'Povijest testiranja',
    path: '/povijest_testiranja',
    isLoged: false,
    icon: <FaComments />,
  },
]
