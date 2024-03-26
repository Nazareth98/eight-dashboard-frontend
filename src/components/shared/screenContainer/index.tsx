const ScreenContainer = ({ children }: any) => {
  return (
    <div className="block-height w-full grid grid-cols-12 grid-rows-10 gap-8 p-8">
      {children}
    </div>
  );
};

export default ScreenContainer;
