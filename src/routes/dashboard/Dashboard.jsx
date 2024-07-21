import Content from '@/components/content/content'
import Nav from '@/components/nav/nav'
import Sider from '@/components/sider/sider'
import { useState } from 'react';

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
  return (
    <div className='flex'>
        <Sider collapsed={collapsed}/>
        <div className='w-full flex flex-col'>
            <Nav collapsed={collapsed} setCollapsed={setCollapsed}/>
            <div className='flex-1 p-[20px]'>
                <Content />
            </div>
        </div>
    </div>
  )
}

export default Dashboard