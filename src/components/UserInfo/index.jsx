import React, { useEffect } from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarURL, user, additionalText }) => {

useEffect(() => {

}, [avatarURL] )

  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarURL} alt={user} />
      <div className={styles.userDetails}>
        <span className={styles.userName}><b>{user}</b></span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  )
}
