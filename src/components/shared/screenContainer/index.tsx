const ScreenContainer = ({ children }: any) => {
  return (
    <div className="w-full h-full grid grid-cols-12 grid-rows-12 p-8 overflow-y-auto gap-8 flex-wrap fade-left">
      {children}
    </div>
  );
};

export default ScreenContainer;
