function HalfStarIcon({ width, height }: IIconProps) {
  return (
    <svg
      width={width ?? 24}
      height={height ?? 24}
      viewBox='0 0 15 15'
      fill='currentColor'>
      <defs>
        <clipPath id='half-star'>
          <rect
            x='0'
            y='0'
            width='7.5'
            height='15'
          />
        </clipPath>
      </defs>
      <g clipPath='url(#half-star)'>
        <rect
          x='7.5'
          y='0'
          width='7.5'
          height='15'
          fill='yourColor'
        />
      </g>
      <polygon
        fill='currentColor'
        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
        clipPath='url(#half-star)'
      />
      <polygon
        fill='transparent'
        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
      />
    </svg>
  );
}

export default HalfStarIcon;
