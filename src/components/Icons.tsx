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
        clip-rule="evenodd"
        d="m7.643 15.69 7.774-7.773a2.357 2.357 0 1 0-3.334-3.334L4.31 12.357a3.333 3.333 0 0 0-.977 2.357v1.953h1.953c.884 0 1.732-.352 2.357-.977Z"
      ></path>
      <path d="m11.25 5.417 3.333 3.333"></path>
    </g>,
    { ...props, title: 'FreeHand', className: 'relative top-1 left-1' }
  );
};
