'use client'

import { useRouter } from 'next/navigation'
import { TiHome, TiUser } from "react-icons/ti";
import { IoApps } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";

import Dock from './Dock'

export default function NavigationDock() {
  const router = useRouter()

  const items = [
    { icon: <TiHome size={18} />, label: 'Home', onClick: () => router.push('/') },
    { icon: <IoApps size={18} />, label: 'Application', onClick: () => router.push('/applications') },
    { icon: <TiUser size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <CiShoppingCart size={18} />, label: 'Shop', onClick: () => alert('Shop!') },
  ];

  return (
    <Dock
      className='z-100 fixed bottom-10'
      items={items}
      panelHeight={68}
      baseItemSize={50}
      magnification={70}
    />
  )
}
