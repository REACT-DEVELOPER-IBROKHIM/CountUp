import { useOutletContext, useParams, useLocation, Outlet } from "react-router-dom";
import { SectionTypography as ContentTitle, Loading } from "@/utils";
import { CircleUserRound, Archive, CircleDollarSign } from "lucide-react";
import { mappings } from "@/static/component-mappings";
import { Button } from "@/components/ui/button";
import "./details.css";

const Details = () => {
    const {pathname} = useLocation();
    const { id } = useParams();
    const { query } = useOutletContext();
    const { data: user, isLoading } = query({ id });
    
  return (
    <div className="flex h-full flex-col">
      <ContentTitle>Batafsil</ContentTitle>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="w-full flex-1 grid grid-rows-3 grid-flow-col gap-4">
          <div className="row-span-3 col-span-1 shadow-3xl rounded-lg p-5 min-w-[200px]">
            {
                mappings.profile({pathname})       
            }
          </div>
          <div className="max-h-[270px] col-span-3 shadow-3xl flex items-center px-10 rounded-lg gap-4">
            <CircleUserRound size={100} className="text-gray-700" />
            <div className="flex flex-1 justify-between items-center">
              {user && (
                <div>
                  <div className="flex flex-col items-start">
                    <h3 className="text-3xl font-bold text-gray-800">
                      {user.innerData?.fname}
                    </h3>
                    <h1 className="text-md font-semibold text-slate-700">
                      {user.innerData?.lname}
                    </h1>
                    <a href={`tel:${user?.innerData.phone_primary}`}>
                      {user?.innerData.phone_primary}
                    </a>
                    {/* TODO: secondary phone modal */}
                    {/* <a className="text-slate-500" href={`tel:${user?.innerData.phone_secondary}`}>{ user?.innerData.phone_secondary }</a> */}
                    {user && user.innerData.isActive && (
                      <div className="bg-green-200 text-center text-[14px] py-[3px] px-4 gap-2 rounded-[30px] text-green-900 mt-2">
                        Faol
                      </div>
                    )}
                  </div>
                </div>
              )}
              {
                <div className="flex flex-col gap-2 items-end">
                  <h3 className="text-3xl font-bold">
                    {" "}
                    {user?.innerData.budget.fprice()}
                  </h3>
                  <address className="text-sm text-slate-500 break-words max-w-[400px] text-right">
                    {user?.innerData.address} Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Ducimus, corporis?
                  </address>
                  <div className="flex gap-2">
                    <Button className="flex gap-2">
                      <Archive size={18} />
                      Arxivlash
                    </Button>
                    <Button className="flex gap-2">
                      <CircleDollarSign size={18} />
                      To'lov
                    </Button>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="min-h-[400px] row-span-2 col-span-3 shadow-3xl rounded-lg w-full p-5">
            <Outlet context={ {_id: user.innerData._id} } />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
