import "./index.css";
import React from "react";

const Loading = () => {
  return  <div className="loader"></div>
}

const Suspense = ({ children, type }) => {
  return (
    <React.Suspense fallback={<div className={!type ? "h-screen" : "h-full flex items-center"}><Loading/></div>}>{children}
    </React.Suspense>
  )
}

const SectionTypography = ({children}) => {
  return <h2 className="text-2xl font-medium mb-4">{children}</h2>
}

export {Suspense, SectionTypography, Loading}