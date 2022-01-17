import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Form, Space, Select, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { collection, setDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase/Config';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import './Ownsurvey.css'


const { TextArea } = Input;
const { confirm } = Modal;

const Ownsurvey = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [arrdata, setarrdata] = useState([])

    const userid = localStorage.getItem("currentuser")

    const showModal = () => { setIsModalVisible(true) };
    const handleOk = () => { setIsModalVisible(false) };
    const handleCancel = () => { setIsModalVisible(false) };

    const onFinish = values => {
        let { alldata, surveyname } = values;
        const id = doc(collection(db, "survey"))._key.path.segments[1];
        let newobject = {
            name: surveyname,
            data: alldata,
            key: id,
            uid: userid,
        };
        setDoc(doc(db, "survey", id), newobject);
        handleOk();
        getdata();
    };


    //user survey data in table
    useEffect(() => {
        getdata();
    }, [])

    let arr = [];
    const getdata = () => {
        getDocs(collection(db, "survey")).then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                if (userid === doc.data().uid) {
                    let fdataname = doc.data().name;
                    let fdataid = doc.data().key;
                    arr.push({
                        arrsurveyname: fdataname,
                        arrsurveyid: fdataid,
                    })
                }

            })
            setarrdata(arr)
        }).catch((err) => {
            console.log(err)
        })
    };



    const expandedRowRender = () => {
        const columns = [
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Email', dataIndex: 'email', key: 'email' },
            { title: 'User Id', dataIndex: 'userid', key: 'userid' },
        ];
        return <Table className='resulttable' columns={columns} pagination={false} />;
    };

    const columns = [
        { title: 'S.No', dataIndex: 'sno', key: 'sno', render: (text, object, index) => index + 1 },
        { title: 'Survey Name', dataIndex: 'surveyname', key: 'surveyname', },
        { title: 'Survey Id', dataIndex: 'surveyid', key: 'surveyid', },
        { title: 'Delete', dataIndex: 'delete', key: 'delete', },
    ];

    const delteitem = (id) => {
        confirm({
            title: 'Do you Want to delete this items?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteDoc(doc(db, "survey", id));
                getdata();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const data = arrdata.map((alldata, index) => {
        const userdata = {
            key: index,
            surveyname: alldata.arrsurveyname,
            surveyid: alldata.arrsurveyid,
            delete: <DeleteOutlined style={{ color: 'red' }} onClick={() => delteitem(alldata.arrsurveyid)} />
        }
        return userdata;
    })

    return (
        <>
            <div className='modal-comp'>
                <div className='surveybutton'>
                    <p>Create your own survey</p>
                    <Button type="primary" onClick={showModal} className='ownsurveybutton'>
                        Create Survey
                    </Button>
                </div>
                <Modal title="Survey" visible={isModalVisible} onCancel={handleCancel} onOk={handleOk} footer={null}>
                    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                        <Form.Item label="Survey Name" name='surveyname' rules={[{ required: true, message: 'Missing survey name' }]}>
                            <Input />
                        </Form.Item>
                        <Form.List name="alldata">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item label='Question' {...restField} name={[name, 'question']} rules={[{ required: true, message: 'Missing question' }]}>
                                                <TextArea placeholder="Enter Question" autoSize={{ minRows: 2, maxRows: 3 }} />
                                            </Form.Item>
                                            <Form.Item label="Answer" {...restField} name={[name, 'answer']} rules={[{ required: true, message: 'Missing answer' }]}>
                                                <Select className='selectoption' style={{ width: '90px' }}>
                                                    <Select.Option value="true">True</Select.Option>
                                                    <Select.Option value="false">False</Select.Option>
                                                </Select>
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Question</Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className='createsurvey'>create</Button>
                            <Button type="danger" htmlType="submit" onClick={handleCancel} className='createsurvey'>Cancel </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

            {/* user own survey in table*/}
            <div className='main_hometable'>
                <Table columns={columns} dataSource={data} pagination={false} expandable={{ expandedRowRender }} />
            </div>
        </>
    )
}

export default Ownsurvey;