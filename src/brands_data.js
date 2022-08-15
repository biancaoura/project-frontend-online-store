/* eslint-disable import/prefer-default-export */
import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as SiIcons from 'react-icons/si';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
// import * as BsIcons from 'react-icons';
// import * as BsIcons from 'react-icons';

const classname = 'brands-icons';
const catego = 'Celular';
const categoGames = 'Consoles';

export const brands = [
  {
    name: 'Apple',
    icon: <BsIcons.BsApple />,
    classname,
    catego,
  },
  {
    name: 'Nokia',
    icon: <SiIcons.SiNokia />,
    classname,
    catego,
  },
  {
    name: 'Motorola',
    icon: <SiIcons.SiMotorola />,
    classname,
    catego,
  },
  {
    name: 'Samsung',
    icon: <SiIcons.SiSamsung />,
    classname,
    catego,
  },
  {
    name: 'Xiaomi',
    icon: <SiIcons.SiXiaomi />,
    classname,
    catego,
  },
];

export const gamesBrands = [
  {
    name: 'PlayStation',
    icon: <SiIcons.SiPlaystation />,
    classname,
    categoGames,
  },
  {
    name: 'Microsoft',
    icon: <BsIcons.BsMicrosoft />,
    classname,
    categoGames,
  },
  {
    name: 'Nintendo',
    icon: <SiIcons.SiNintendoswitch />,
    classname,
    categoGames,
  },
  {
    name: 'Notebook Gamer',
    icon: <MdIcons.MdComputer />,
    classname,
    categoGames,
  },
  {
    name: 'PC Gamer',
    icon: <RiIcons.RiComputerLine />,
    classname,
    categoGames,
  },
];
