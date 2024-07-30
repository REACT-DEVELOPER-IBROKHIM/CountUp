import React from "react";
import { SectionTypography as ContentTitle } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loading } from "@/utils";
import { Fragment, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

const ProductTable = (props) => {
  const [open, setOpen] = useState(false);
  const {
    data,
    page,
    limit,
    handleLimit,
    nextPage,
    isLoading,
    isFetching,
    tableHeaders,
    userType,
  } = props;
  const total = useMemo(
    () => Math.ceil(data?.totalCount / limit) || 0,
    [data?.totalCount, limit]
  );
  const indexTotal = useMemo(() => limit * (page - 1) || 0, [page, limit]);
  const [searchParams, setSearchParams] = useSearchParams();

  const addQuary = (params) => {
    let paramsObject = {};
    for (let i of searchParams.entries()) {
      let [key, value] = i;
      paramsObject[key] = value;
    }
    setSearchParams({ ...paramsObject, ...params });
  };
  
  const removeQuary = (params)=>{
    let paramsObject = {};
    for (let i of searchParams.entries()) {
      let [key, value] = i;
      if(params !== key){
        paramsObject[key] = value;
      }
    }
    setSearchParams({ ...paramsObject });
  }
  return (
    <>
      <div className="flex gap-5">
        <button onClick={() => addQuary({ archive: true })}>Mavjud</button>
        <button onClick={() => addQuary({ archive: false })}>Mavjud emas</button>
        <button onClick={() => removeQuary("archive")}>Mavjud emas</button>
      </div>
      <ContentTitle>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            Mahsulotlar
            {!isLoading && <Badge>{data?.totalCount}</Badge>}
          </div>
          <Button onClick={() => setOpen(true)} className="flex gap-1">
            <Plus size={18} />
            <span className="">Qo'shish</span>
          </Button>
        </div>
      </ContentTitle>
      <Table className="w-full shadow">
        <TableCaption>Mahsulotlar</TableCaption>
        <TableHeader>
          <TableRow>{tableHeaders.map(
          (header, index, arr) => (
            <TableHead
              key={index}
            >
          {header}
        </TableHead>
      )
    )}</TableRow>
        </TableHeader>
        <TableBody className="relative">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={tableHeaders.length}>
                <div className="h-[500px]">
                  <Loading />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data?.innerData.map((product, index) => (
              <Fragment key={product._id}>
                <TableRow>
                  <TableCell className="font-medium ">
                    <div className="flex gap-1">{indexTotal + index + 1}</div>
                  </TableCell>
                  <TableCell>
                    <Link to={`details/${product._id}`}>
                      <strong>{product.title}</strong>
                      <p>{product.category}</p>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <p>
                      {product.quantity.brm()} {product.units}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p>{product.price.brm()}</p>
                  </TableCell>
                  <TableCell>
                    <p>{(product.price * product.quantity).brm()}</p>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={tableHeaders.length}>
              <div className="flex justify-end items-center gap-5">
                <Pagination
                  count={total}
                  page={page}
                  onChange={(_, value) => nextPage(value)}
                />
                <Select onValueChange={(l) => handleLimit(l)}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder={limit} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default ProductTable;
