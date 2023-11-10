import { useState } from 'react';

import { toolbox } from '../constants';
import { ToolbarItem } from './ToolbarItem';
import { useBoard } from '../context/BoardContext';

type ToolbarProps = {
  onChange: (name: string) => void;
};

export const Toolbar: React.FC<ToolbarProps> = ({ onChange }) => {
  const { selectedTool, selectedToolAction } = useBoard();
  const [tool, setTool] = useState(selectedTool);

  return (
    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex gap-3 bg-slate-300 z-10 p-3 rounded-md shadow-md">
      {toolbox.map((item) => (
        <ToolbarItem
          key={item.name}
          name={item.name}
          selected={tool === item.name}
          icon={item.icon}
          onSelect={() => {
            setTool(item.name);
            onChange(item.name);
            selectedToolAction({ name: item.name });
          }}
        />
      ))}
    </div>
  );
};
