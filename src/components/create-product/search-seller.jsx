import React, { memo, useState  } from "react";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useGetSellerSearchQuery } from "@/redux/api/seller-api";
import { Loading } from "@/utils";

const SearchSeller = ({setIsSeller, setSeller}) => {
  const [value, setValue] = useState("");
  const { data, isFetching, isError, isSuccess } = useGetSellerSearchQuery({
    value,
    limit:5
  }, {skip: !value.trim() });
  const searchItems = data?.innerData?.map((item) => (
    <div
      key={item._id}
      onClick={()=> setSeller(item)}
      className="border-b cursor-pointer py-1 hover:bg-slate-50"
    >
      <p className="font-medium">
        {item.fname} {item.lname}
      </p>
      <p className="text-sm">{item.phone_primary}</p>
    </div>
  ));
  return (
    <div className='p-1'>
      <label className="mb-2 inline-block text-sm font-medium">
        Sotuvchini kiriting
      </label>
      <div className="flex gap-3 items-center">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1"
          placeholder="Sotuvchini qidirish"
        />
        <Button onClick={() => setIsSeller((p) => !p)}>
          <Plus />
        </Button>
      </div>
      {isSuccess && !isFetching && (
        <div className="mt-3 max-h-80 overflow-auto">{searchItems}</div>
      )}
      {isFetching && value.trim() && (
        <div className="mt-4">
          <Loading />
        </div>
      )}
      {isError && value.trim() && (
        <p className="text-center mt-4 text-slate-500">Hech kim topilmadi</p>
      )}
    </div>
  );
};

export default memo(SearchSeller);
