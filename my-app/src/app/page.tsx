"use client";

// pages/index.tsx
import React from 'react';
import { SideMenu } from './Sidebar'; // Adjust the path if necessary
import styles from './Home.module.css';

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <SideMenu />
            <div className={styles.content}>
                <h1>Welcome to the Dashboard</h1>
                <p>This is your main content area.</p>
            </div>
        </div>
    );
};

export default Home;
