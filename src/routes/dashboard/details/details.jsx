import { useOutletContext, useParams } from "react-router-dom";
import { SectionTypography as ContentTitle } from "@/utils";
import {CircleUserRound, Archive} from "lucide-react";
import { Button } from "@/components/ui/button";

const Details = () => {
    const {id} = useParams();
    const [{query}] = useOutletContext();
    const {data, isLoading} = query({id})
    console.log(data)
   
  return (
    <div className="flex h-full flex-col">
        <ContentTitle>Batafsil</ContentTitle>
        <div className="w-full flex-1 grid grid-rows-3 grid-flow-col gap-4">
            <div className="row-span-3 col-span-1 shadow-3xl rounded-lg"></div>
            <div className="col-span-3  shadow-3xl flex items-center px-10 rounded-lg gap-4">
                <CircleUserRound size={100} className="text-gray-700"/>
                <div className="flex flex-1 justify-between items-center">
                    {
                        data &&
                        <div className="flex flex-col items-start">
                            <h3 className="text-3xl font-bold text-gray-800">{data.innerData?.fname}</h3>
                            <h1 className="text-md font-semibold text-slate-700">{data.innerData?.lname}</h1>
                            {
                                 data && data.innerData.isActive &&  <div className="bg-green-200 text-center text-[14px] py-[3px] px-4 gap-2 rounded-[30px] text-green-900 mt-2">
                                 Faol
                                 </div>
                            }
                           
                        </div>
                    }
                   {
                   
                    <div className="flex"> 
                   <Button><Archive size={18}/>Arxivlash</Button>
                    </div>
                   }
                </div>
            </div>
            <div className="row-span-2 col-span-3 shadow-3xl rounded-lg"></div>
        </div>
    </div>
  )
}

export default Details