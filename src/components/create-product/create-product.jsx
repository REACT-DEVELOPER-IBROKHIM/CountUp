import React, { memo, useState } from "react";
import SearchSeller from "./search-seller";
import { Button } from "../ui/button";
import SearchProduct from "./search-product";
import CreateBuyorsell from "./create-buyorsell";

const CreateProduct = ({ setIsSeller }) => {
  const [seller, setSeller] = useState(null);
  const [product, setProduct] = useState(null);
  return (
    <div>
      {seller ? (
        <>
          <div className="flex items-center justify-between">
            <p>
              {seller?.fname} {seller?.lname}
            </p>
            <Button variant="secondary" onClick={() => setSeller(null)}>
              Boshqa sotuvchini tanlash
            </Button>
          </div>
        </>
      ) : (
        <SearchSeller setIsSeller={setIsSeller} setSeller={setSeller} />
      )}
      {!product ? (
        <SearchProduct setProduct={setProduct} />
      ) : (
      <CreateBuyorsell product={product} seller={seller} setProduct={setProduct}/>
      )}
    </div>
  );
};

export default memo(CreateProduct);
