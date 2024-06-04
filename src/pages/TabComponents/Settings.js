import React ,{useMemo, useState} from 'react';
import {Button, Select ,Space, Card, Col, Row ,ColorPicker, Form, Input, Radio, notification, Descriptions } from 'antd';
import { Switch } from 'antd';
import axios from "axios";

import {  EditOutlined} from '@ant-design/icons';


const Alerts = () => {
  const [api, contextHolder] = notification.useNotification();

  // COLOR PICKER USESTATE
  const [color, setColor] = useState("#561ecb");

// FORM STATE
  const [form] = Form.useForm();

// State Values
const [data,setData] = useState();

  // POST METHOD FOR SENDING COLOR CODE
  const handlePost = (param)=>{
    console.log(data)
if(data === '' || data === undefined || data === null){
  return (
    api.open({
      message: 'Please Fill out required Fields',
      placement:'top',
           })
  )
}
    const payload = {
      "name": data,
      "color_code": handleChange
    }
    
    const PostData = async()=>{
      const res = await axios.post(`http://143.110.184.45:8100/${param}/`,payload)
      try{
        api.open({
          message: `${param} created`,
          placement:'top',
               });
      }
      catch(err){
        console.log(err)
      }

    }
    PostData()
  }


const handleChange = useMemo(
  ()=>(typeof color === "string" ? color:color?.toHexString()),
  [color],
);
console.log(data)
  return (
<>
{contextHolder}

<Row gutter={24} style={{display:'flex',justifyContent:'space-between'}}>
<Col span={9} > 
</Col>
<Col span={3}  >

<Button type="primary" style={{width:'100%',padding:'0'}} danger>
User Creation
    </Button>   </Col>
</Row>
<Row gutter={24} style={{display:'flex',flexDirection:'column',}} >
  <Col span={18} style={{display:'flex',justifyContent:'space-between',background:'#80808017',flexDirection:'column',gap:'1rem',padding:'1rem',fontWeight:'500',borderRadius:'10px'}}>
    <div className="" style={{display:'flex',justifyContent:'space-between',gap:'1rem'}}>
<div className="">
  <div>Email Id</div>
  <div>developer@mail.com</div>
</div>
<div className="">
<div>Mobile Number</div>
  <div>987654310</div>
</div>
<div className="">
<div>Password</div>
  <div>12345</div>
</div>
    </div>
<div style={{fontWeight:650}}>Users</div>
<div className="" style={{display:'flex',justifyContent:'space-between',gap:'1rem'}}>
  <div className="">
  <div>Email Id</div>
  <div>developer@mail.com</div>
</div>
<div className="">
<div>Mobile Number</div>
  <div>987654310</div>
</div>
<div className="">
<div>Password</div>
  <div>12345</div>
</div>
</div>
  </Col>
</Row>
<Row style={{display:'flex',flexDirection:'column',}}>
  <Col style={{display:'flex',alignItems:'baseline' ,gap:'1rem'}}>
  <h5 style={{fontWeight:650,marginBottom:0,fontSize:'1.5rem'}}>Send email notification</h5>
  <Switch defaultChecked />
  </Col>
  <Col style={{display:'flex',alignItems:'baseline' ,gap:'1rem'}}>
  <h5 style={{fontWeight:650,marginBottom:0,fontSize:'1.5rem'}}>Send sms notification</h5>
  <Switch defaultChecked />

  </Col>
</Row>
</>
  )
}

export default Alerts