import React from 'react'
import Logout from '../../components/logout/Logout';
import Navbar from '../../components/navbar/Navbar';
import Ownsurvey from '../../components/ownsurvey/Ownsurvey';

const Home = () => {
    return (
        <div>
            <Navbar />
            
            <Ownsurvey />
         
            <Logout />
        </div>
    )
}
export default Home;