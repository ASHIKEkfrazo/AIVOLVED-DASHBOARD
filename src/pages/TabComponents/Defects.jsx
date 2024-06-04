import React ,{useEffect, useMemo, useState} from 'react';
import {Button, Select ,Space, Card, Col, Row ,ColorPicker,Table, Tag, Form, Input, Radio, notification, Descriptions } from 'antd';
import { Switch } from 'antd';
import axios from "axios";

import {  EditOutlined} from '@ant-design/icons';
import { API, baseURL } from '../../API/apirequest'


const Defects = () => {
  const dummyData = [
    {
        "id": 1,
        "name": "Air Packet",
        "color_code": "#141885"
    },
    {
        "id": 2,
        "name": "Seal-Join/Tear",
        "color_code": "#1d4d59"
    },
    {
        "id": 3,
        "name": "Seal - Align",
        "color_code": "#3266a8"
    },
    {
        "id": 10,
        "name": "Perforation/Burn/Damage",
        "color_code": "#a83832"
    },
    {
        "id": 11,
        "name": "Soil/Dirt/Grease",
        "color_code": "#820f8a"
    },
    {
        "id": 12,
        "name": "Wrapper",
        "color_code": "#0cebe7"
    },
    {
        "id": 13,
        "name": "Crush/Dent/Tear/Puncture",
        "color_code": "#b86166"
    },
    {
        "id": 14,
        "name": "⁠Barcode-Missing/Positio",
        "color_code": "#15305c"
    },
    {
        "id": 15,
        "name": "⁠product code PLC",
        "color_code": "#701351"
    },
    {
        "id": 16,
        "name": "qwedqwd",
        "color_code": "#ff16d8"
    },
    {
        "id": 18,
        "name": "aa",
        "color_code": "#561ecb"
    },
    {
        "id": 19,
        "name": "aa",
        "color_code": "#561ecb"
    },
    {
        "id": 20,
        "name": "d",
        "color_code": "#561ecb"
    },
    {
        "id": 21,
        "name": "Defect 2",
        "color_code": "#ff1674"
    }
]
// Table Columns
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        id: 'id',
        render: (text) => <a>{text}</a>,
      },
    {
      title: 'Defect Name',
      dataIndex: 'name',
      id: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Color ',
      dataIndex: 'color_code',
      id: 'color_code',
      render:(col)=><div className="" style={{height:"40px",width:'40px',borderRadius:'20px',background:`${col}`}}></div>
    },
    {
      title: 'Color Code ',
      dataIndex: 'color_code',
      id: 'color_code',
    },

  ];
// Table  Data 



const [api, contextHolder] = notification.useNotification();
const [tableData,setTableData] = useState(dummyData)

useEffect(()=>{
const url = `${baseURL}defect`
axios.get(url)
.then(res =>
    // setTableData(res.data)
    null
)
.catch(err=> console.log(err))

},[]);

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
    }
    


    const PostData = async()=>{
        const url = `${baseURL}defect`

    //   const res = await axios.post(`http://143.110.184.45:8100/${param}/`,payload)
      const res = await axios.post(`${url}/`,payload)
      try{
        api.open({
          message: `Defect created`,
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

const dataMap = Array(15).fill({
  title: "Machine 1",
  img:"https://aivolved.in/wp-content/uploads/2022/11/ai-logo.png" 
});
const limitedDataSource = tableData.slice(0, 5);
  return (
<>
{contextHolder}

<Row gutter={24} style={{display:'flex',flexDirection:'column',padding:'1rem'}}>
  <Col span={24} style={{margin:'1rem',display:'flex',justifyContent:'flex-end'}}>
        <Button style={{background:'#EC522D',color:'#fff'}} onClick={()=>handlePost('department')}>Create Defects</Button>
  </Col>
  <Col style={{display:'flex',flexWrap:'wrap',gap:'1rem'}}>

  {
            dataMap.map((index,item)=>
    
      <Card key={index} size="small" style={{width:"250px",display:'flex',justifyContent:'center',height:'200px',alignItems:'center',boxShadow:'none',border: "1px solid #0000004a"}}>
        <h2>Organization Name</h2>
          <h6>Organization Name</h6>
          <p>Created on 09/11/2020</p>
    </Card>
                
            )
        }
 
  </Col>
</Row>


</>
  )
}

export default Defects