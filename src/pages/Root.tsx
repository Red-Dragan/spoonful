import React from "react";
import { Outlet, useNavigation } from "react-router";
import MainNavigation from "../components/MainNavigation";
import LoadingSpinner from "../components/LoadingSpinner";
import styles from "../styles/Root.module.css";

const RootPage: React.FC = () => {
  const navigation = useNavigation();
  return (
    <div className={styles.root}>
      <MainNavigation/>
      <main className={styles.main}>
        <div className={styles.container}>
          {navigation.state === "loading" ? <LoadingSpinner/> : <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default RootPage;
