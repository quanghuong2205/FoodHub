function MenuIcon({ width, height }: IIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width={width ?? 100}
      height={height ?? 100}
      viewBox='0 0 50 50'>
      <path d='M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z'></path>
    </svg>
  );
}

export default MenuIcon;
