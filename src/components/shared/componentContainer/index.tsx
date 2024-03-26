interface ComponentContainerType {
  rows: string;
  cols: string;
  children: any;
}

const ComponentContainer = ({
  rows,
  cols,
  children,
}: ComponentContainerType) => {
  return (
    <div
      className={`h-full col-span-${cols} row-span-${rows} bg-gray-900 p-4 rounded-sm border-2 border-gray-800 flex flex-col gap-4`}
    >
      {children}
    </div>
  );
};

export default ComponentContainer;
