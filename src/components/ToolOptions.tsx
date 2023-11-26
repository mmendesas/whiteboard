import { useEffect, useState } from 'react';
import {
  strokeColors,
  backgroundColors,
  fillStyle,
  strokeWidth,
  sloppinessStyle,
} from '../constants';

import {
  FillOptionsIcon,
  LineIcon,
  RectangleIcon,
  SloppinessIcon,
} from './Icons';
import { useBoard } from '../context/BoardContext';

export const ToolOptions = () => {
  const initialState = {
    backgroundColor: backgroundColors[0].value,
    fillStyle: fillStyle[0].name,
    sloppinessStyle: sloppinessStyle[0].value,
    strokeColor: strokeColors[0].value,
    strokeWidth: strokeWidth[0].value,
  };
  const [options, setOptions] = useState(initialState);

  const { selectedOptionsAction } = useBoard();

  useEffect(() => {
    selectedOptionsAction(options);
  }, [options]);

  const handleOptionChange = (key: string, value: string | number) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const selectedOptionStyle = 'rounded-md bg-teal-100 border-teal-300 border-2';
  const notSelectedStyle = 'rounded-md bg-slate-200 border-2';

  return (
    <div className="flex flex-col gap-3 bg-slate-100 z-10 p-3 shadow-xl absolute top-20 left-3 rounded-md">
      {/* stroke color */}
      <div>
        <span className="text-black text-xs font-bold">Stroke</span>
        <div className="flex gap-1">
          {strokeColors.map(({ value }) => {
            return (
              <div
                key={value}
                className={`hover: cursor-pointer ${
                  options.strokeColor === value
                    ? selectedOptionStyle
                    : notSelectedStyle
                }`}
                onClick={() => handleOptionChange('strokeColor', value)}
              >
                <RectangleIcon strokeWidth="0" color="#666" fill={value} />
              </div>
            );
          })}
        </div>
      </div>

      {/* background color */}
      <div>
        <span className="text-black text-xs font-bold">Background</span>
        <div className="flex gap-1">
          {backgroundColors.map(({ value }) => {
            return (
              <div
                key={value}
                className={`hover: cursor-pointer ${
                  options.backgroundColor === value
                    ? selectedOptionStyle
                    : notSelectedStyle
                }`}
                onClick={() => handleOptionChange('backgroundColor', value)}
              >
                <RectangleIcon
                  strokeWidth="0"
                  color="#666"
                  fill={value === 'transparent' ? 'white' : value}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* fill style */}
      <div>
        <span className="text-black text-xs font-bold">Fill</span>
        <div className="flex gap-1">
          {fillStyle.map(({ name }) => (
            <div
              key={name}
              className={
                options.fillStyle === name
                  ? selectedOptionStyle
                  : notSelectedStyle
              }
              onClick={() => handleOptionChange('fillStyle', name)}
            >
              <FillOptionsIcon name={name} color="#333" />
            </div>
          ))}
        </div>
      </div>

      {/* stroke width */}
      <div>
        <span className="text-black text-xs font-bold">Stroke width</span>
        <div className="flex gap-1">
          {strokeWidth.map(({ name, value }) => (
            <div
              key={name}
              className={
                options.strokeWidth === value
                  ? selectedOptionStyle
                  : notSelectedStyle
              }
              onClick={() => handleOptionChange('strokeWidth', value)}
            >
              <LineIcon color="#333" strokeWidth={value} />
            </div>
          ))}
        </div>
      </div>

      {/* roughness style */}
      <div>
        <span className="text-black text-xs font-bold">Sloppiness</span>
        <div className="flex gap-1">
          {sloppinessStyle.map(({ name, value }) => (
            <div
              key={name}
              className={
                options.sloppinessStyle === value
                  ? selectedOptionStyle
                  : notSelectedStyle
              }
              onClick={() => handleOptionChange('sloppinessStyle', value)}
            >
              <SloppinessIcon name={name} color="#666" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
