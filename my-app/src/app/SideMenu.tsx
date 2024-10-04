"use client";

import { FC, useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaCog, FaPlus, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Home",
    icon: <FaHome />,
    path: "/",
  },
  {
    name: "Market Place",
    icon: <FaCog />,
    items: [
      { name: "Premium Market Place", path: "/market/premium" },
      { name: "Normal Market Place", path: "/market/normal" },
    ],
  },
  {
    name: "Game Development",
    icon: <FaPlus />,
    path: "/game-development",
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
    setActiveItem(activeItem === name ? "" : name);
  };

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-[#1d212a] border-r border-zinc-800
        transition-all duration-500 ease-in-out overflow-y-auto
        ${isExpanded ? 'w-[260px]' : 'w-[80px]'}`}
    >
      {/* Header */}
      <div className="h-[72px] px-4 border-b border-zinc-800 flex items-center">
        <button 
          onClick={onToggle}
          className="w-10 h-10 rounded-lg hover:bg-zinc-800 flex items-center justify-center text-white
            transition-colors duration-300"
        >
          <GiHamburgerMenu size={20} />
        </button>
        <div className={`ml-4 overflow-hidden transition-all duration-500 ease-in-out
          ${isExpanded ? 'opacity-100 w-32' : 'opacity-0 w-0'}`}>
          <span className="text-white font-medium whitespace-nowrap">Admin</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="px-4 mt-4">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.path ? (
              <Link href={item.path} passHref>
                <button
                  onClick={() => handleItemClick(item.name)}
                  className={`w-full rounded-lg hover:bg-zinc-800 text-white
                    flex items-center h-12 mb-1
                    ${activeItem === item.name ? 'bg-zinc-800' : ''}
                    ${!isExpanded ? 'justify-center px-2' : 'px-4'}
                    transition-all duration-500 ease-in-out`}
                >
                  <span className={`text-xl transition-transform duration-500 ease-in-out
                    ${!isExpanded ? 'transform scale-110' : ''}`}>
                    {item.icon}
                  </span>
                  <div className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out
                    ${isExpanded ? 'opacity-100 w-full ml-4' : 'opacity-0 w-0 ml-0'}`}>
                    <span className="flex-1 text-left whitespace-nowrap">{item.name}</span>
                  </div>
                </button>
              </Link>
            ) : (
              <button
                onClick={() => handleItemClick(item.name)}
                className={`w-full rounded-lg hover:bg-zinc-800 text-white
                  flex items-center h-12 mb-1
                  ${activeItem === item.name ? 'bg-zinc-800' : ''}
                  ${!isExpanded ? 'justify-center px-2' : 'px-4'}
                  transition-all duration-500 ease-in-out`}
              >
                <span className={`text-xl transition-transform duration-500 ease-in-out
                  ${!isExpanded ? 'transform scale-110' : ''}`}>
                  {item.icon}
                </span>
                <div className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out
                  ${isExpanded ? 'opacity-100 w-full ml-4' : 'opacity-0 w-0 ml-0'}`}>
                  <span className="flex-1 text-left whitespace-nowrap">{item.name}</span>
                  {item.items && (
                    <FaChevronDown
                      className={`transform transition-transform duration-300 ease-in-out
                        ${activeItem === item.name ? 'rotate-180' : ''}`}
                    />
                  )}
                </div>
              </button>
            )}

            {/* Dropdown Menu */}
            {item.items && (
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                  ${activeItem === item.name && isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                {item.items.map((subItem) => (
                  <Link key={subItem.name} href={subItem.path} passHref>
                    <button
                      className="w-full text-white/80 hover:text-white hover:bg-zinc-800
                        flex items-center h-10 px-4 pl-14 rounded-lg mb-1
                        text-sm transition-all duration-300 ease-in-out"
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