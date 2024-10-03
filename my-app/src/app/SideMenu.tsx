"use client";

import { FC, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaCog, FaPlus, FaLock, FaBoxOpen, FaHeart } from "react-icons/fa";
import "./SideBar.css";

const menuItems = [
  {
    name: "Home",
    icon: <FaHome />,
  },
  {
    name: "Settings",
    icon: <FaCog />,
    items: ["Display", "Editor", "Theme", "Interface"],
  },
  {
    name: "Create",
    icon: <FaPlus />,
    items: ["Article", "Document", "Report"],
  },
  {
    name: "Account",
    icon: <FaLock />,
    items: ["Dashboard", "Logout"],
  },
  {
    name: "Products",
    icon: <FaBoxOpen />,
  },
  {
    name: "Favourites",
    icon: <FaHeart />,
  },
];

type Item = {
  name: string;
  icon: JSX.Element;
  items?: string[];
};

type ButtonProps = {
  onClick: (item: string) => void;
  name: string;
  icon?: JSX.Element;
  isActive: boolean;
  hasSubNav?: boolean;
};

const Icon = ({ icon }: { icon: JSX.Element }) => (
  <span className="icon">{icon}</span>
);

const NavHeader = ({ onToggle }: { onToggle: () => void }) => (
  <header className="sidebar-header">
    <button type="button" onClick={onToggle}>
      <Icon icon={<GiHamburgerMenu />} />
    </button>
    <span>Admin</span>
  </header>
);

const NavButton: FC<ButtonProps> = ({
  onClick,
  name,
  icon,
  isActive,
  hasSubNav,
}) => (
  <button
    type="button"
    onClick={() => onClick(name)}
    className={isActive ? "active" : ""}
  >
    {icon && <Icon icon={icon} />}
    <span>{name}</span>
    {hasSubNav && <Icon icon={<FaPlus />} />}
  </button>
);

type SubMenuProps = {
  item: Item;
  activeItem: string;
  handleClick: (item: string) => void;
};

const SubMenu: FC<SubMenuProps> = ({ item, activeItem, handleClick }) => {
  const navRef = useRef<HTMLDivElement>(null);

  const isSubNavOpen = (item: string, items: string[]) =>
    items.some((i) => i === activeItem) || item === activeItem;

  return (
    <div
      className={`sub-nav ${isSubNavOpen(item.name, item.items || []) ? "open" : ""}`}
      style={{
        height: !isSubNavOpen(item.name, item.items || [])
          ? 0
          : navRef.current?.clientHeight,
      }}
    >
      <div ref={navRef} className="sub-nav-inner">
        {item.items?.map((subItem) => (
          <NavButton
            key={subItem} // Add a key prop for each sub-item
            onClick={handleClick}
            name={subItem}
            isActive={activeItem === subItem}
          />
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(true); // State for expanding/collapsing

  const handleClick = (item: string) => {
    setActiveItem(item !== activeItem ? item : "");
  };

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <aside className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <NavHeader onToggle={toggleSidebar} />
      {menuItems.map((item) => (
        <div key={item.name}>
          {!item.items && (
            <NavButton
              onClick={handleClick}
              name={item.name}
              icon={item.icon}
              isActive={activeItem === item.name}
              hasSubNav={!!item.items}
            />
          )}
          {item.items && (
            <>
              <NavButton
                onClick={handleClick}
                name={item.name}
                icon={item.icon}
                isActive={activeItem === item.name}
                hasSubNav={!!item.items}
              />
              <SubMenu
                activeItem={activeItem}
                handleClick={handleClick}
                item={item}
              />
            </>
          )}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
