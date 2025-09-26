import React from "react";
import { Outlet } from "react-router";
import MainNavigation from "../components/MainNavigation";
import styles from "../styles/Root.module.css";

const RootPage: React.FC = () => {
  return (
    <div className={styles.root}>
      <MainNavigation/>
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootPage;
