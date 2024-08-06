import React, { memo, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Loading } from "@/utils";
import { useGetProductSearchQuery } from '@/redux/api/products-api';

const SearchProduct = ({setProduct}) => {
    const [value, setValue] = useState("");
    const { data, isFetching, isError, isSuccess } = useGetProductSearchQuery({
      value,
      limit:5
    },{skip: !value.trim() });
    const searchItems = data?.innerData?.map((item) => (
      <div
        key={item._id}
        onClick={()=> setProduct(item)}
        className="border-b cursor-pointer py-1 hover:bg-slate-50"
      >
        <p className="font-medium">
          {item.title} 
        </p>
        <p className="text-sm">{item.price?.brm()} UZS</p>
      </div>
    ));
    return (
      <div className='p-1'>
        <label className="mb-2 pt-4 inline-block text-sm font-medium">
          Mahsulotni tanlang yoki qo'shing
        </label>
        <div className="flex gap-3 items-center">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1"
            placeholder="Mahsulot qidirish"
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
}

export default memo(SearchProduct)