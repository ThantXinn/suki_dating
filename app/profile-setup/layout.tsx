/** @format */

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className='w-2/3 mx-auto px-10 lg:px-32'>{children}</div>;
};

export default layout;
