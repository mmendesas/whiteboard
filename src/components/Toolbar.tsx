import { toolbox } from '../constants';
import { ToolbarItem } from './ToolbarItem';
import { useBoard } from '../context/BoardContext';

export const Toolbar = () => {
  const { selectedTool, selectedToolAction } = useBoard();

  return (
    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex gap-3 bg-slate-300 z-10 p-3 rounded-md shadow-md">
      {toolbox.map((item) => (
        <ToolbarItem
          key={item.name}
          name={item.name}
          selected={selectedTool === item.name}
          icon={item.icon}
          onSelect={() => {
            selectedToolAction({ name: item.name });
          }}
        />
      ))}
    </div>
  );
};
