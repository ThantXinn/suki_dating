/** @format */

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className='w-full mx-auto px-20 lg:px-32'>{children}</div>;
};

export default layout;
