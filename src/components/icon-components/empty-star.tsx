function EmptyStarIcon({ width, height }: IIconProps) {
  return (
    <svg
      width={width ?? 24}
      height={height ?? 24}
      enableBackground='new 0 0 15 15'
      viewBox='0 0 15 15'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      x='0'
      y='0'>
      <polygon
        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'></polygon>
    </svg>
  );
}

export default EmptyStarIcon;
