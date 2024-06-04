import React from 'react';
import { Tabs ,ConfigProvider} from 'antd';
import Alerts from "./TabComponents/Alerts"
import Defects from "./TabComponents/Defects"
import Settings from "./TabComponents/Settings"
import Department from "./TabComponents/Department"
import Machine from "./TabComponents/Machine"

const onChange = (key) => {
  console.log(key);
};


const items = [
  {
    key: '1',
    label: 'User Creation',
    children:<Settings/> ,
  },
  {
    key: '2',
    label: 'Defects',
    children: <Defects/>,
  },
  {
    key: '3',
    label: 'Department',
    children: <Department />,
  },
  {
    key: '4',
    label: 'Machine',
    children: <Machine />,
  },
  {
    key: '5',
    label: 'Alerts',
    children: <Alerts />,
  },
];

const App = () => 
  <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: 'gold', // Customize the ink bar color
            itemColor:"rgba(0, 0, 0, 0.88)",
            itemActiveColor:"rgba(0, 0, 0, 0.88)",
            itemSelectedColor:"rgba(0, 0, 0, 0.88)",
            itemHoverColor:"rgba(0, 0, 0, 0.88)"
          },
        },
        token: {
          paddingSM:24
        },
      }}
    >
<Tabs   
size={'large'} defaultActiveKey="1" items={items} onChange={onChange}   />
    </ConfigProvider>

export default App;
