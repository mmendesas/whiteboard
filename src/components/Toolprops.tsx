import { useState } from 'react';
import { strokeColors, backgroundColors } from '../constants';
import { RectangleIcon } from './Icons';

export const Toolprops = () => {
  const initialState = {
    strokeColor: strokeColors[0].value,
    backgroundColor: backgroundColors[0].value,
  };

  const [options, setOptions] = useState(initialState);

  const handleOptionChange = (key: string, value: string) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-3 bg-slate-300 z-10 p-3 shadow-xl absolute top-20 left-3 rounded-md">
      <LineDetail
        title="Stroke"
        options={options}
        onSetOption={(value: string) =>
          handleOptionChange('strokeColor', value)
        }
        list={strokeColors}
        option="strokeColor"
      />

      <LineDetail
        title="Background"
        options={options}
        onSetOption={(value: string) =>
          handleOptionChange('backgroundColor', value)
        }
        list={backgroundColors}
        option="backgroundColor"
      />
    </div>
  );
};

type LineDetailProps = {
  title: string;
  list: Array<unknown>;
  option: string;
  options: { [key: string]: unknown };
  onSetOption: (value: string) => void;
};

const LineDetail: React.FC<LineDetailProps> = ({
  title,
  list,
  option,
  options,
  onSetOption,
}) => {
  return (
    <div>
      <span className="text-black text-xs font-bold">{title}</span>
      <div className="flex gap-1">
        {list.map(({ value }) => {
          return (
            <div
              key={value}
              className={`hover: cursor-pointer ${
                options[option] === value && 'rounded-md bg-slate-100'
              }`}
              onClick={() => onSetOption(value)}
            >
              <div className="border-2 border-gray-400 rounded-md">
                <RectangleIcon strokeWidth="0" color="#666" fill={value} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};