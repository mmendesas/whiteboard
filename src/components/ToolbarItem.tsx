type ToolbarItemProps = {
  name: string;
  selected: boolean;
  onSelect: () => void;
};

export const ToolbarItem: React.FC<ToolbarItemProps> = ({
  name,
  selected,
  onSelect,
}) => {
  const highligth = selected ? 'bg-slate-100 text-gray-500' : '';

  return (
    <div
      className={`hover:bg-slate-100 hover:text-gray-400 hover:cursor-pointer p-1 rounded-md ${highligth}`}
      onClick={onSelect}
    >
      <span>{name}</span>
    </div>
  );
};
