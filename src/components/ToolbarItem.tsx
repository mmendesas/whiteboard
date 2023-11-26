import { LineIcon } from './Icons';

type ToolbarItemProps = {
  name: string;
  selected: boolean;
  onSelect: () => void;
  icon: (props: unknown) => JSX.Element;
};

export const ToolbarItem: React.FC<ToolbarItemProps> = ({
  name,
  selected,
  onSelect,
  icon,
}) => {
  const highligth = selected
    ? 'rounded-md bg-teal-100 border-teal-300 border-2'
    : '';
  const Icon = icon || LineIcon;

  return (
    <div
      className={`hover:bg-slate-100 hover:text-gray-400 hover:cursor-pointer p-1 rounded-md ${highligth}`}
      onClick={onSelect}
    >
      <span className="hidden">{name}</span>
      <Icon />
    </div>
  );
};
