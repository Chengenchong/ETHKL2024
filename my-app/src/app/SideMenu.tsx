"use client";

import { FC, useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaStore, FaPlus, FaChevronDown, FaUser, FaEthereum } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import './SideBar.css';
import path from "path";

const menuItems = [
  {
    name: "Home",
    icon: <FaHome size={15} />,
    path: "/",
  },
  {
    name: "Market Place",
    icon: <FaStore size={15} />,
    items: [
      { name: "Premium Market Place", path: "/market/premium" },
      { name: "Normal Market Place", path: "/market/normal" },
    ],
  },
  {
    name: "Game Development",
    icon: <FaPlus size={15} />,
    path: "/game-development",
  },
  {
    name: "Mint NFT",
    icon: <FaEthereum size={15} />,
    path: "/mintNFT",
  },
  {
    name: "Profile",
    icon: <FaUser size={15} />,
    path: "/profile",
  },
];

type SidebarProps = {
  isExpanded: boolean;
  onToggle: () => void;
};

const Sidebar: FC<SidebarProps> = ({ isExpanded, onToggle }) => {
  const [activeItem, setActiveItem] = useState<string>("");
  const pathname = usePathname();
  
  useEffect(() => {
    const currentItem = menuItems.find(item => 
      item.path === pathname || item.items?.some(subItem => subItem.path === pathname)
    );
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [pathname]);

  const handleItemClick = (name: string) => {
    setActiveItem(activeItem === name ? "" : name.toString());
  };

  return (
    <aside
      className={`sidebar fixed top-0 left-0 h-screen
        transition-[width] duration-700 ease-in-out overflow-y-auto
        ${isExpanded ? 'w-[260px]' : 'w-[80px]'}`}
    >
      {/* Header */}
      <div className="sidebar-header h-[72px] px-4 flex items-center justify-center">
        <button 
          onClick={onToggle}
          className="sidebar-toggle w-10 h-10 rounded-lg flex items-center justify-center
            transition-all duration-700 ease-in-out"
        >
          <GiHamburgerMenu size={15} />
        </button>
        {isExpanded && (
          <div className="ml-4 flex-grow">
            <span 
              className={`sidebar-title font-medium whitespace-nowrap transition-opacity duration-500 ease-in-out
              ${isExpanded ? 'opacity-100 delay-200' : 'opacity-0'}`}
            >
              Admin
            </span>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="sidebar-nav px-4 mt-8">
        {menuItems.map((item) => (
          <div key={item.name} className="mb-6">
            {item.path ? (
              <Link href={item.path} passHref>
                <button
                  onClick={() => handleItemClick(item.name)}
                  className={`sidebar-item w-full rounded-lg flex items-center h-12
                    ${activeItem === item.name ? 'active' : ''}
                    ${!isExpanded ? 'justify-center' : 'px-4'}
                    transition-all duration-700 ease-in-out`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {isExpanded && (
                    <span 
                      className={`ml-4 flex-grow text-left whitespace-nowrap transition-opacity duration-500 ease-in-out
                      ${isExpanded ? 'opacity-100 delay-200' : 'opacity-0'}`}
                    >
                      {item.name}
                    </span>
                  )}
                </button>
              </Link>
            ) : (
              <button
                onClick={() => handleItemClick(item.name)}
                className={`sidebar-item w-full rounded-lg flex items-center h-12
                  ${activeItem === item.name ? 'active' : ''}
                  ${!isExpanded ? 'justify-center' : 'px-4'}
                  transition-all duration-700 ease-in-out`}
              >
                <span className="text-xl">{item.icon}</span>
                {isExpanded && (
                  <>
                    <span 
                      className={`ml-4 flex-grow text-left whitespace-nowrap transition-opacity duration-500 ease-in-out
                      ${isExpanded ? 'opacity-100 delay-200' : 'opacity-0'}`}
                    >
                      {item.name}
                    </span>
                    {item.items && (
                      <FaChevronDown
                        className={`transform transition-transform duration-500 ease-in-out
                          ${activeItem === item.name ? 'rotate-180' : ''}`}
                      />
                    )}
                  </>
                )}
              </button>
            )}

            {/* Dropdown Menu */}
            {item.items && (
              <div
                className={`sidebar-dropdown overflow-hidden transition-[max-height] duration-700 ease-in-out
                  ${activeItem === item.name && isExpanded ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
              >
                {item.items.map((subItem) => (
                  <Link key={subItem.name} href={subItem.path} passHref>
                    <button
                      className="sidebar-dropdown-item w-full flex items-center h-10 px-4 pl-14 rounded-lg mb-1
                        text-sm transition-all duration-500 ease-in-out"
                    >
                      <span className="whitespace-nowrap">{subItem.name}</span>
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;