
import { useState,useEffect } from "react";
import axios from 'axios';
import {Card,Col, Row, Typography, Select, DatePicker,Checkbox, Button, Dropdown, Menu} from "antd";
import { baseURL } from "../API/apirequest";
import Paragraph from "antd/lib/typography/Paragraph";
import {  VideoCameraOutlined, BugOutlined, AlertOutlined,} from '@ant-design/icons';
import StackChart from "../components/chart/StackChart";
import LineChart from "../components/chart/LineChart";
import PieChart from "../components/chart/PieChart";
import MachinesParameter from "./MachinesParameterWithPagination";
import MachinesParameterWithPagination from "./MachinesParameterWithPagination";
import MachineParam from "../components/chart/MachineParam";
import Slider from "../components/Slider/Slider"


function Dashboard() {
 
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7); 
  const formattedStartDate = startDate.toISOString().slice(0, 10);  
  const endDate = new Date(); 
  const formattedEndDate = endDate.toISOString().slice(0, 10); 
  
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [dateRange, setDateRange] = useState([formattedStartDate, formattedEndDate]);
  const [tableData, setTableData] = useState([]);
  const [machineOptions, setMachineOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const handleMachineChange = value => {
    setSelectedMachine(value);
  };
  const handleDepartmentChange = value => {
    setSelectedDepartment(value);
  };

  

  const handleDateRangeChange = (dates, dateStrings) => {
    if (dateStrings) {
      console.log(dateStrings)
      setDateRange(dateStrings);
    } else {
      console.error('Invalid date range:', dates,dateStrings);
    }
  };
  
  const handleApplyFilters = () => {
    const domain = baseURL;
    const [fromDate, toDate] = dateRange;
    let url = `${domain}reports/?`;
    url += `machine=${selectedMachine}&department=${selectedDepartment}`;
    if (fromDate && toDate) {
      url += `&from_date=${fromDate}&to_date=${toDate}`;
    }
    axios.get(url)
      .then(response => {
        setTableData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const extractAndSumPersons = (data) => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    return data
      .filter(entry => {
        const entryDate = new Date(entry.date_time).toISOString().split('T')[0];
        return entryDate === today;
      })
      .reduce((sum, entry) => sum + parseInt(entry.no_of_persons, 10), 0); // Sum the number of persons
  };
  const dates = extractAndSumPersons(tableData);
 
  useEffect(()=>{
    setInterval(()=>{
      initialTableData();
    },180000)
 
  },[])
  useEffect(() => {

    initialDateRange();
    initialTableData();

  }, []);


 


  // const getMachines = () => {
  //   const domain = baseURL;
  //   let url = `${domain}machine/?`;
  //   axios.get(url)
  //     .then(response => {
  //       const formattedMachines = response.data.map(machine => ({
  //         id: machine.id,
  //         name: machine.name,
  //       }));
  //       setMachineOptions(formattedMachines);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching machine data:', error);
  //     });
  // };

  // const getDepartments = () => {
  //   const domain = baseURL;
  //   let url = `${domain}department/?`;
  //   axios.get(url)
  //     .then(response => {
  //       const formattedDepartment = response.data.map(department => ({
  //         id: department.id,
  //         name: department.name,
  //       }));
  //       setDepartmentOptions(formattedDepartment);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching department data:', error);
  //     });
  // };
  const initialDateRange = () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // 7 days ago
    const formattedStartDate = startDate.toISOString().slice(0, 10); // Format startDate as YYYY-MM-DD
    
    const endDate = new Date(); // Today's date
    const formattedEndDate = endDate.toISOString().slice(0, 10); // Format endDate as YYYY-MM-DD
    
    setDateRange([formattedStartDate, formattedEndDate]);
  };

  const initialTableData = () => {
    const domain = `${baseURL}dashboard/`;
    const [fromDate, toDate] = [startDate, endDate].map(date => date.toISOString().slice(0, 10)); // Format dates as YYYY-MM-DD
    const url = `${domain}`;
    axios.get(url)
      .then(response => {
  
        setTableData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

const [alertData,setAlertData]=useState();

//   const alertApi = ()=>{
//     const domain = baseURL;
//     const url = `${domain}alerts/`;
//     axios.get(url).then((res)=>{
// console.log(res.data)
// setAlertData(res.data)
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   }
 

  const { Title } = Typography;
  const { RangePicker } = DatePicker;

  const [categoryDefects, setCategoryDefects] = useState([]);
// Function to categorize defects
const categorizeDefects = (data) => {
  const categories = {};
  
  // Iterate through each date in the tableData
  Object.keys(data).forEach(date => {
    const defects = data[date];
    
    // Iterate through each defect in the current date
    Object.keys(defects).forEach(defect => {
      if (!categories[defect]) {
        categories[defect] = 0;
      }
      
      // Accumulate the defect value for the category
      categories[defect] += defects[defect];
    });
  });
  
  return categories;
};

  useEffect(() => {
 
    const categorizedData = categorizeDefects(tableData);
    setCategoryDefects(categorizedData);
  }, [tableData]);

  const [selectedCheckboxMachine, setSelectedCheckboxMachine] = useState([]);

  const handleMachineCheckBoxChange = (checkedValues) => {
    setSelectedCheckboxMachine(checkedValues);
    let url = `${baseURL}reports?machine=`;
    checkedValues.forEach((machineId, index) => {
      if (index !== 0) {
        url += ',';
      }
      url += `machine${machineId}`;
    });

    axios.get(url)
    .then(response => {
      console.log(response) 
      // setTableData(response.data);
    })
    .catch(error => {
      console.error('Error fetching department data:', error);
    });
  };
  
  const menu = (
    <Menu selectable={true}>
      <Menu.Item key="0">
        <Checkbox.Group style={{ display: "block" }} value={selectedCheckboxMachine} onChange={handleMachineCheckBoxChange}>
          {machineOptions.map(machine => (
            <div key={machine.id} style={{display:"flex",flexDirection:"column"}}>
              <Checkbox style={{fontSize:"1.1rem",width:"100%"}} value={machine.id}>{machine.name}</Checkbox>
            </div>
          ))}
        </Checkbox.Group>
      </Menu.Item>
    </Menu>
  );
  const [imageData, setImageData]= useState([])

  useEffect(()=>{
    const domain = `${baseURL}dashboard_preview/`;
    axios.get(domain)
     .then((res)=>{
         setImageData(res.data)
     })
     .catch((err)=>{
         console.log(err)
     })


 },[])
  
  return (
    <>
      <div className="layout-content">
      <Row className="rowgap-vbox" gutter={[24, 0]}>
      <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              className="mb-24"
              style={{display:"flex",gap:"1rem"}}
            >
      <Select
  style={{ minWidth: "200px", marginRight: "10px" }}
  showSearch
  placeholder="Select Machine"
  defaultValue={selectedMachine} 
  onChange={handleMachineChange}
  size="large"
>
  console.log(tableData.length)
  {machineOptions.map(machine => (
    <Select.Option key={machine.id} value={machine.id}>{machine.name}</Select.Option>
  ))}
</Select>

      <Select
        style={{ minWidth: "200px", marginRight: "10px" }}
        showSearch
        placeholder="Select Department"
        onChange={handleDepartmentChange}
        defaultValue={selectedDepartment}
        size="large"
      >
        {departmentOptions.map(department => (
          <Select.Option key={department.id} value={department.id}>{department.name}</Select.Option>
        ))}
      </Select>
      <RangePicker
          size="large"
        style={{ marginRight: "10px",minWidth:"280px" }}
        onChange={handleDateRangeChange}
          
      />
   
      <Button type="primary" onClick={handleApplyFilters} style={{fontSize:"1rem",backgroundColor:"#c91245",marginRight:"10px"}}>Apply filters</Button>


       </Col>
        </Row>
  

        <Row className="rowgap-vbox" gutter={[24, 0]}>
            <Col
              key={1}
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              className="mb-24"
            >
            <Card bordered={false} className="criclebox ">
              <Dropdown overlay={menu} trigger={['click']}>
      
    <div className="number">
      <Row align="middle">
        <Col xs={18}>
          <small style={{fontWeight:"bold",color:"#808080"}}>Human count for the day</small>
          <Title level={3}>
            {`Humans`}
          </Title>
          <span>{dates}</span>
        </Col>
        <Col xs={6}>
          <div className="icon-box"><VideoCameraOutlined /></div>
        </Col>
      </Row>
    </div>
               </Dropdown>
            </Card>

            </Col>
            <Col
              key={1}
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle">
                    <Col xs={18}>
                      <Title level={3}>
                        {`Violations`}
                      </Title>

                      {/* <span>  {Object.keys(categoryDefects).reduce((total, category) => total + category, 0)}</span> */}
                      <span>  {Object.keys(categoryDefects).length}</span>

                    </Col>
                    <Col xs={6}>
                      <div className="icon-box"><BugOutlined /></div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col
              key={1}
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle">
                    <Col xs={18}>
                      <Title level={3}>
                        {`Areas`}
                      </Title>
                      {
                        alertData ? 
                        <span>{Object.keys(alertData).length }</span>
                        :null
                      }
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box"><AlertOutlined /></div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
        </Row>
        <Row style={{display:'flex',justifyContent:'center'}}>

<Col  className="mb-24" style={{width:"100%",margin:'3rem 0',display:'flex',justifyContent:'center'}}>
<Slider data={imageData}/>
</Col> 
</Row>
   
        <Row gutter={[24, 24]}>
          {/* <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
         <Card bordered={false} className="h-full">
         {Object.keys(categoryDefects).map((category, index) => (
  <Card key={index} bordered={true} className="criclebox h-full mb-2 px-2 ">
    <div className="timeline-box">
      <h5>{category}</h5>
      <Paragraph className="lastweek">
        <span className="bnb2">{categoryDefects[category]}</span> Defects
      </Paragraph>
    </div>
  </Card>
))}

<Card bordered={true} className="criclebox h-full mb-2 px-2">
  <div className="timeline-box">
    <h5>Total Defects</h5>
    <Paragraph className="lastweek">
      <span className="bnb2">
        {Object.values(categoryDefects).reduce((total, category) => total + category, 0)}
      </span> Defects
    </Paragraph>
  </div>
</Card>

  </Card>
</Col> */}
{/* <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <MachineParam   />

            </Card>
            </Col> */}

          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart data={tableData}/>
            </Card>
          </Col>
           <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <StackChart data={tableData}/>

            </Card>
          </Col> 
          {/* <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <PieChart  data={tableData} />
            </Card>
          </Col> */}
        </Row>


      </div>
    </>
  );
}

export default Dashboard;