import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowLeftSvg = (props) => (
  <Svg
    width={17}
    height={16}
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.5 13L14.5 8M14.5 8L9.5 3M14.5 8H2.5"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ArrowLeftSvg;
