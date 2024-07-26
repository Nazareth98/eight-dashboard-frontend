import { ComponentProps } from "react";

interface ComponentContainerType extends ComponentProps<"div"> {
  rows?: string;
  cols?: string;
  classToAdd?: string;
  children: any;
}

const ComponentContainer = (props: ComponentContainerType) => {
  const { rows, cols, classToAdd, children } = props;

  const classString = `col-span-${cols} row-span-${rows} ${classToAdd} p-6 rounded-xl border-2 border-gray-900 flex flex-col gap-10 transition-all fade-left`;

  return (
    <div className={classString} {...props}>
      {children}
    </div>
  );
};

export default ComponentContainer;
