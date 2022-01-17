import React from 'react'
import Allsurvey from '../../components/allsurvey/Allsurvey';
import Navbar from '../../components/navbar/Navbar';
import './Survey.css'

const Survey = () => {
    return (
        <div>
            <div className='alltablenavbar'>
            <Navbar />
            </div>

             <Allsurvey />
        </div>
    )
}
export default Survey;