import React from 'react';
import styles from './CreatorCard.module.css';
import { useRouter } from 'next/router';
import Routes from "@/constants/Routes";

const CreatorCard = ({ name, image, slug }) => {
    const router = useRouter();
    const truncatedName = name.length > 14 ? name.substring(0, 14) + "..." : name;
  return ( 
    <span onClick={()=> router.push(Routes.home(slug))}>
      <img src={image} alt={name} className={styles['avatar-image']}/>
      <h5 className={styles['avatar-name']}>{truncatedName}</h5>
    </span>
  );
};

export default CreatorCard;

  {/*<div className={styles['avatar-card']} onClick={()=> router.push(Routes.home(slug))}>
      <div className={styles['avatar-card-inner']}>*/}
    
      {/* </div>
    </div> */}