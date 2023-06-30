import React from 'react';
import CreatorCard from './CreatorCard';
import styles from './CreatorCardList.module.css';

interface Creator {
  id: number;
  first_name: string;
  last_name: string;
  artist_id: string;
  image: string;
  photo: { cover: string };
}

interface CreatorCardListProps {
  headline: string;
  creators: Creator[];
}

const CreatorCardList: React.FC<CreatorCardListProps> = ({ headline, creators }) => {
  return (
    <div>
      <h3 style={{color:"#f5f5f5"}}>{headline}</h3>
      <div className={styles['avatar-card-list']}>
        {creators.map((creator) => (
            <div className={styles['avatar-card']} key={creator.artist_id}>
                <CreatorCard 
                  name={creator.first_name+' '+creator.last_name} 
                  image={creator.photo.cover}
                  slug={(creator.first_name+'-'+creator.last_name).toLocaleLowerCase()}
                />
            </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorCardList;
