import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#45C93B"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
