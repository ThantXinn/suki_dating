/** @format */

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className='w-3/4 mx-auto px-10 lg:px-32'>{children}</div>;
};

export default layout;
