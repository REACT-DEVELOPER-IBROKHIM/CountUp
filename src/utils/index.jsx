import "./index.css";
import React from "react";

const Loading = () => {
  return  <div className="loader"></div>
}

const Suspense = ({ children }) => {
  return (
    <React.Suspense fallback={<div className="h-screen "><Loading/></div>}>{children}
    </React.Suspense>
  )
}

const SectionTypography = ({children}) => {
  return <h2 className="text-2xl font-medium mb-4">{children}</h2>
}

export {Suspense, SectionTypography, Loading}