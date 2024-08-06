import React, { memo } from "react";
import { Button } from "../ui/button";
import { useGetValue } from "@/hooks/useGetValue";
import { NumericFormat } from 'react-number-format';
import { useCreateBuyorsellInputMutation } from "@/redux/api/buyrosell-api";

const initialState = {
  price: "",
  quantity: "",
  expense: "",
  comment: "",
};

const CreateBuyorsell = ({ product, setProduct, seller }) => {
  const { formData, handleChange, setFormData } = useGetValue(initialState);
  const [createBuyorsell, {data, isLoading}] = useCreateBuyorsellInputMutation()
  const handleSubmit = (e)=>{
    e.preventDefault();
    ["price", "quantity", "expense"].forEach(el => {
        formData[el] = +formData[el].replace(/\D/gi, "")
    });
    createBuyorsell({...formData, productId: product._id, sellerId: seller._id})
}
  return (
    <form onSubmit={handleSubmit} className="p-1">
      <div className="flex items-center justify-between mt-3">
        <p>{product?.title}</p>
        <Button variant="secondary" onClick={() => setProduct(null)}>
          Boshqa mahsulotni tanlash
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div>
          <label className="block font-medium text-sm mb-1" htmlFor="">
            Miqdori
          </label>
          <NumericFormat
            allowLeadingZeros
            thousandSeparator=" " 
            value={formData.quantity}
            name="quantity"
            onChange={handleChange}
            className="w-full py-2 px-3 outline-none border rounded"
            type="text"
            placeholder="miqdori"
          />
        </div>
        <div>
          <label className="block font-medium text-sm mb-1" htmlFor="">
            Narxi
          </label>
          <NumericFormat
            allowLeadingZeros
            thousandSeparator=" "
            value={formData.price}
            name="price"
            onChange={handleChange}
            className="w-full py-2 px-3 outline-none border rounded"
            type="text"
            placeholder="narxi"
          />
        </div>
        <div>
          <label className="block font-medium text-sm mb-1" htmlFor="">
            Harajat
          </label>
          <NumericFormat
            allowLeadingZeros
            thousandSeparator=" "
            value={formData.expense}
            name="expense"
            onChange={handleChange}
            className="w-full py-2 px-3 outline-none border rounded"
            type="text"
            placeholder="harajat"
          />
        </div>
        <div>
          <label className="block font-medium text-sm mb-1" htmlFor="">
            Izoh
          </label>
          <input
            value={formData.comment}
            name="comment"
            onChange={handleChange}
            className="w-full py-2 px-3 outline-none border rounded"
            type="text"
            placeholder="izoh"
          />
        </div>
        <Button>Saqlash</Button>
      </div>
    </form>
  );
};

export default memo(CreateBuyorsell);
