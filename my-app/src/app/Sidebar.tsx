// components/Sidebar.tsx
import React, { useState } from 'react';
import styles from './sidebar.module.css'; // We'll define the CSS next

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <button className={styles.toggleButton} onClick={toggleSidebar}>
                {isOpen ? 'Close' : 'Open'}
            </button>
            <nav className={styles.menu}>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
