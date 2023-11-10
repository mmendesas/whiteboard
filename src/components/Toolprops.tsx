import { strokeColors } from '../constants';

export const Toolprops = () => {
  return (
    <div className="flex flex-col gap-3 bg-slate-300 z-10 p-3 shadow-xl absolute top-20 left-3 rounded-md">
      <div>
        <span className="text-black text-xs">Stroke</span>
        <div className="flex gap-3">
          {strokeColors.map(({ value }) => (
            <div
              key={value}
              onClick={() => {
                console.log('set stroke color', value);
              }}
            >
              <div
                className={`h-6 w-6`} //
                style={{ backgroundColor: value }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
