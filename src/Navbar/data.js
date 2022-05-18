//import React, { useState, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa'
import { FaPills } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";
import { FaSyringe } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { ImLab } from "react-icons/im";

export const SidebarData = [
  {
    title: 'Na čekanju',
    path: '/',
    icon: <FaIcons.FaHourglassHalf/>,
  },

  {
    title: 'Naručeni',
    path: 'naruceni',
    icon: <FaIcons.FaRegClipboard />,
  },

  {
    title: 'Cijepljeni',
    path: '/cijepljeni',
    icon: <FaSyringe />,
  },
  {
    title: 'Testiranje',
    path: '/testiranje',
    icon: <ImLab />,
  },
  {
    title: 'Povijest testiranja',
    path: '/povijest_testiranja',
    icon: <FaFolder />,
  },
]
