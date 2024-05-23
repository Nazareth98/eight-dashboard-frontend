const ScreenContainer = ({ children }: any) => {
  return (
    <div className="w-full h-full grid grid-cols-12 grid-span-12 p-8 overflow-y-auto gap-8 flex-wrap">
      {children}
    </div>
  );
};

export default ScreenContainer;
