import Content from '@/components/content/content'
import Nav from '@/components/nav/nav'
import Sider from '@/components/sider/sider'
import { useCallback, useState } from 'react';

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapsed = useCallback(() => {
        setCollapsed(!collapsed);
    }, [collapsed]);

  return (
    <div className='flex'>
        <Sider collapsed={collapsed}/>
        <div className='w-full flex flex-col'>
            <Nav collapsed={collapsed} handleCollapsed={handleCollapsed}/>
            <div className='flex-1 p-[20px]'>
                <Content />
            </div>
        </div>
    </div>
  )
}

export default Dashboard