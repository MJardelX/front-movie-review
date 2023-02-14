import React, { useEffect, useState } from 'react';
import { getAppInfo } from '../api/admin';
import AppInfoBox from '../components/AppInfoBox';
import LatestUploads from '../components/LatestUploads';
import MostRatedMovies from '../components/MostRatedMovies';
import { useNotification } from '../hooks';



const Dashboard = () => {


    const {updateNotification} = useNotification();
    const [appInfo, setAppInfo] = useState({
        movieCount: 0,
        reviewCount:0,
        userCount:0
    })

    const fetchAppInfo = async () =>{
        const {error, appInfo} = await getAppInfo();
        if(error) return updateNotification("error", error)
        setAppInfo({...appInfo});
    }

    useEffect(()=>{
        fetchAppInfo();
    },[])


    return (
        <div className="grid grid-cols-3 gap-5 pl-5">
            <AppInfoBox title='Total Uploads' subtitle={appInfo.movieCount.toLocaleString()} />
            <AppInfoBox title='Total Reviews' subtitle={appInfo.reviewCount.toLocaleString()} />
            <AppInfoBox title='Total Users'   subtitle={appInfo.userCount.toLocaleString()} />
            <LatestUploads />
            <MostRatedMovies />
        </div>
    )
}

export default Dashboard;
