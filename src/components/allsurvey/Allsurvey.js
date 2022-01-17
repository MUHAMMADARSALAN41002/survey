import React, {useEffect, useState} from 'react'
import { db } from '../../firebase/Config';
import { getDocs, collection } from 'firebase/firestore';
import { Button, Table } from 'antd';
import './Allsurvey.css'

const Allsurvey = () => {

    const [arrdata, setarrdata] = useState([])

    useEffect(() => {
        getdata();
    }, [])

    let arr = [];
    const getdata = () => {
        getDocs(collection(db, "survey")).then(querySnapshot => {
            querySnapshot.forEach((doc) => {           
                    let fdataname = doc.data().name;
                    let fdataid = doc.data().key;
                    arr.push({
                        arrsurveyname: fdataname,
                        arrsurveyid: fdataid,
                    })
            })
            setarrdata(arr)
        }).catch((err) => {
            console.log(err)
        })
    };

    const columns = [
        { title: 'S.No', dataIndex: 'sno', key: 'sno', render: (text, object, index) => index + 1},
        { title: 'Survey Name', dataIndex: 'surveyname', key: 'surveyname', },
        { title: 'Survey Id', dataIndex: 'surveyid', key: 'surveyid', },
        { title: 'Start', key: 'start', dataIndex: 'start', },
    ];


    const data = arrdata.map((alldata, index) => {
        const userdata = {
            key: index,
            surveyname: alldata.arrsurveyname,
            surveyid: alldata.arrsurveyid,
            start:  <Button type='primary' onClick={() => console.log(alldata.arrsurveyid)}> Start Survey </Button>
        }
        return userdata;
    })

    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={false} className='alldisplaytable'/>
        </div>
    )
}
export default Allsurvey;