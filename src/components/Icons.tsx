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
    <g strokeWidth={props.strokeWidth || 2.5}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <rect x="4" y="4" width="16" height="16" rx="2"></rect>
    </g>,
    { ...props, title: 'Rectangle' }
  );

export const LineIcon = (props: any) =>
  getSvgBase(
    <path d="M4.167 10h11.666" strokeWidth={props.strokeWidth || '3.5'}></path>,
    { ...props, title: 'Line', className: 'relative top-1 left-1' }
  );

export const DiamondIcon = (props: any) => {
  return getSvgBase(
    <g stroke-width="1.5">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M10.5 20.4l-6.9 -6.9c-.781 -.781 -.781 -2.219 0 -3l6.9 -6.9c.781 -.781 2.219 -.781 3 0l6.9 6.9c.781 .781 .781 2.219 0 3l-6.9 6.9c-.781 .781 -2.219 .781 -3 0z"></path>
    </g>,
    { ...props, title: 'Diamond' }
  );
};

export const EllipseIcon = (props: any) => {
  return getSvgBase(
    <g stroke-width="1.5">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="12" cy="12" r="9"></circle>
    </g>,
    { ...props, title: 'Ellipse' }
  );
};

export const SelectionIcon = (props: any) => {
  return getSvgBase(
    <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M6 6l4.153 11.793a0.365 .365 0 0 0 .331 .207a0.366 .366 0 0 0 .332 -.207l2.184 -4.793l4.787 -1.994a0.355 .355 0 0 0 .213 -.323a0.355 .355 0 0 0 -.213 -.323l-11.787 -4.36z"></path>
      <path d="M13.5 13.5l4.5 4.5"></path>
    </g>,
    { ...props, title: 'Selection' }
  );
};
