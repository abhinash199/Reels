import React from 'react';
import { MainLayout} from "@/components/organisms/Layouts";
import BannerCard from '../components/organisms/BannerCard/BannerCard';
import CreatorCardList from '../components/organisms/CreatorList/CreatorCardList';
import { homeService } from '@/containers/home/services';
import { GetServerSideProps } from 'next';

interface HomeProps {
  data?: any;
  error?: Error;
}

const Home = ({bannerData, data}) => {

  return(
    <MainLayout title={'CELEBPRIME'} noFooter={true}>
      <div className='homeContainer'>
        <BannerCard banners={bannerData?.banners}/>
        <div className='avatarCardContainer'>
          {data?.map((creator: { name: string, artists: [] }, idx: number) => 
            <CreatorCardList key= {idx} headline={creator.name} creators={creator.artists}/>)}
        </div>
      </div>
    </MainLayout>
  )
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const response = await homeService.homePage(process.env.NEXT_PUBLIC_HOME_PAGE_ID); 
    let bannerData:{} =[];
    let data: any[] = [];
    if (response?.data?.status_code === 200) {
      const list = response.data.data.list;
      if (Array.isArray(list) && list.length > 0) {
        bannerData = list[0];
        data = list.slice(1);
      }
    }

    return {
      props: {
        bannerData,
        data,
      },
    };
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error('Error fetching data:', error);
    return {
      props: {
        error,
      },
    };
  }
}

export default Home;

{/* <div className='celebCardContainer'> //Add if needed if in future wanna add some card similar to what in fanobyte.fanory.com homepage */} 
{/* <CelebCard celebs={celebs} theme={theme}/> */}
{/* </div> */}