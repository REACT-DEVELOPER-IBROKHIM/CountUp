import { mappings } from "@/static/component-mappings";
import "./sider.css";
import { useGetProfileQuery } from "@/redux/api/profile-api";

const Sider = ({collapsed}) => {
  const {data, isError, isLoading, error} = useGetProfileQuery();

  console.log(data)

  return (
    <aside  data-collapsed={collapsed} className="inset-y sticky h-screen top-0 left-0 z-20 flex flex-col border-r transition duration-500 overflow-hidden shadow-3xl">
      <div className="border-b p-[20px]">{mappings.sider.logo}</div>
      <nav className="flex gap-1 p-2 flex-col flex-1"> 
        {mappings.sider.navs(data)}
      </nav>
    </aside>
  );
};

export default Sider;
