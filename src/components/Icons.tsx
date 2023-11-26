import { cn } from '../utils';

const getSvgBase = (data: React.ReactNode, props: any) => {
  const { title, className, ...rest } = props;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-8 h-8', className)}
      {...rest}
    >
      {title && <title>{title}</title>}
      {data}
    </svg>
  );
};

export const RectangleIcon = (props: any) =>
  getSvgBase(
    <g strokeWidth={props.strokeWidth || 1.5}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <rect x="4" y="4" width="16" height="16" rx="2"></rect>
    </g>,
    { ...props, title: 'Rectangle' }
  );

export const LineIcon = (props: any) =>
  getSvgBase(
    <path d="M4.167 10h11.666" strokeWidth={props.strokeWidth || 1.5}></path>,
    { ...props, title: 'Line', className: 'relative top-1 left-1' }
  );

export const DiamondIcon = (props: any) => {
  return getSvgBase(
    <g strokeWidth={1.5}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M10.5 20.4l-6.9 -6.9c-.781 -.781 -.781 -2.219 0 -3l6.9 -6.9c.781 -.781 2.219 -.781 3 0l6.9 6.9c.781 .781 .781 2.219 0 3l-6.9 6.9c-.781 .781 -2.219 .781 -3 0z"></path>
    </g>,
    { ...props, title: 'Diamond' }
  );
};

export const EllipseIcon = (props: any) => {
  return getSvgBase(
    <g strokeWidth={1.5}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="12" cy="12" r="9"></circle>
    </g>,
    { ...props, title: 'Ellipse' }
  );
};

export const SelectionIcon = (props: any) => {
  return getSvgBase(
    <g
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M6 6l4.153 11.793a0.365 .365 0 0 0 .331 .207a0.366 .366 0 0 0 .332 -.207l2.184 -4.793l4.787 -1.994a0.355 .355 0 0 0 .213 -.323a0.355 .355 0 0 0 -.213 -.323l-11.787 -4.36z"></path>
      <path d="M13.5 13.5l4.5 4.5"></path>
    </g>,
    { ...props, title: 'Selection' }
  );
};

export const FreeHandIcon = (props: any) => {
  return getSvgBase(
    <g strokeWidth="1.5">
      <path
        clipRule="evenodd"
        d="m7.643 15.69 7.774-7.773a2.357 2.357 0 1 0-3.334-3.334L4.31 12.357a3.333 3.333 0 0 0-.977 2.357v1.953h1.953c.884 0 1.732-.352 2.357-.977Z"
      ></path>
      <path d="m11.25 5.417 3.333 3.333"></path>
    </g>,
    { ...props, title: 'FreeHand', className: 'relative top-1 left-1' }
  );
};

export const TextIcon = (props: any) => {
  return getSvgBase(
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
      d="M5.75 0C5.33579 0 5 0.335786 5 0.75C5 1.16421 5.33579 1.5 5.75 1.5H8V7.75C8 8.16421 8.33579 8.5 8.75 8.5C9.16421 8.5 9.5 8.16421 9.5 7.75V1.5H11.75C12.1642 1.5 12.5 1.16421 12.5 0.75C12.5 0.335786 12.1642 0 11.75 0H5.75ZM0.75 3C0.335786 3 0 3.33579"
    ></path>,
    {
      ...props,
      title: 'Text',
      viewBox: '0 0 15 8',
      className: 'relative -left-1',
    }
  );
};

export const FillOptionsIcon = (props: any) => {
  const Hachure = () => {
    return (
      <>
        <path
          d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z"
          stroke="currentColor"
          strokeWidth="1.25"
        ></path>
        <mask
          id="FillHachureIcon"
          maskUnits="userSpaceOnUse"
          x="2"
          y="2"
          width="16"
          height="16"
        >
          <path
            d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.25"
          ></path>
        </mask>
        <g mask="url(#FillHachureIcon)">
          <path
            d="M2.258 15.156 15.156 2.258M7.324 20.222 20.222 7.325m-20.444 5.35L12.675-.222m-8.157 18.34L17.416 5.22"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </>
    );
  };

  const CrossHatch = () => {
    return (
      <>
        <g clipPath="url(#a)">
          <path
            d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z"
            stroke="currentColor"
            strokeWidth="1.25"
          ></path>
          <mask
            id="FillCrossHatchIcon"
            maskUnits="userSpaceOnUse"
            x="-1"
            y="-1"
            width="22"
            height="22"
          >
            <path
              d="M2.426 15.044 15.044 2.426M7.383 20 20 7.383M0 12.617 12.617 0m-7.98 17.941L17.256 5.324m-2.211 12.25L2.426 4.956M20 12.617 7.383 0m5.234 20L0 7.383m17.941 7.98L5.324 2.745"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </mask>
          <g mask="url(#FillCrossHatchIcon)">
            <path
              d="M14.121 2H5.88A3.879 3.879 0 0 0 2 5.879v8.242A3.879 3.879 0 0 0 5.879 18h8.242A3.879 3.879 0 0 0 18 14.121V5.88A3.879 3.879 0 0 0 14.121 2Z"
              fill="currentColor"
            ></path>
          </g>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h20v20H0z"></path>
          </clipPath>
        </defs>
      </>
    );
  };

  const Solid = () => {
    return (
      <>
        <g clipPath="url(#a)">
          <path
            d="M4.91 2.625h10.18a2.284 2.284 0 0 1 2.285 2.284v10.182a2.284 2.284 0 0 1-2.284 2.284H4.909a2.284 2.284 0 0 1-2.284-2.284V4.909a2.284 2.284 0 0 1 2.284-2.284Z"
            stroke="currentColor"
            strokeWidth="1.25"
          ></path>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#aaa" d="M0 0h20v20H0z"></path>
          </clipPath>
        </defs>
      </>
    );
  };

  return getSvgBase(
    <>
      {props.name === 'hachure' && <Hachure {...props} />}
      {props.name === 'cross-hatch' && <CrossHatch {...props} />}
      {props.name === 'solid' && <Solid {...props} />}
    </>,
    {
      ...props,
      title: `fill-options-${props.name}`,
      className: 'w-10 h-10 relative p-1 left-[2px] top-[1.5px]',
    }
  );
};

export const SloppinessIcon = (props: any) => {
  const Architect = () => (
    <path
      d="M2.5 12.038c1.655-.885 5.9-3.292 8.568-4.354 2.668-1.063.101 2.821 1.32 3.104 1.218.283 5.112-1.814 5.112-1.814"
      strokeWidth="1.6"
    ></path>
  );

  const Artist = () => (
    <path
      d="M2.5 12.563c1.655-.886 5.9-3.293 8.568-4.355 2.668-1.062.101 2.822 1.32 3.105 1.218.283 5.112-1.814 5.112-1.814m-13.469 2.23c2.963-1.586 6.13-5.62 7.468-4.998 1.338.623-1.153 4.11-.132 5.595 1.02 1.487 6.133-1.43 6.133-1.43"
      strokeWidth="1.6"
    ></path>
  );

  const Sloppiness = () => (
    <path
      d="M2.5 11.936c1.737-.879 8.627-5.346 10.42-5.268 1.795.078-.418 5.138.345 5.736.763.598 3.53-1.789 4.235-2.147M2.929 9.788c1.164-.519 5.47-3.28 6.987-3.114 1.519.165 1 3.827 2.121 4.109 1.122.281 3.839-2.016 4.606-2.42"
      strokeWidth="1.6"
    ></path>
  );

  return getSvgBase(
    <>
      {props.name === 'architect' && <Architect {...props} />}
      {props.name === 'artist' && <Artist {...props} />}
      {props.name === 'sloppiness' && <Sloppiness {...props} />}
    </>,
    {
      ...props,
      title: 'Sloppiness',
      className: 'w-8 h-8 relative top-1 left-1',
    }
  );
};
