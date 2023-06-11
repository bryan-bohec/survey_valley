import React from 'react';
import { IconProps } from './types';

export const Calendar: React.FC<IconProps> = ({ size = 30, ...rest }) => {
  return (
    <svg  xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...rest}>
    <path  d="M12.9705 5.46829C12.9705 7.67106 11.2043 9.43733 8.99998 9.43733C6.7964 9.43733 5.02949 7.67106 5.02949 5.46829C5.02949 3.26552 6.7964 1.5 8.99998 1.5C11.2043 1.5 12.9705 3.26552 12.9705 5.46829ZM9 16.5C5.74678 16.5 3 15.9712 3 13.9312C3 11.8904 5.76404 11.3804 9 11.3804C12.254 11.3804 15 11.9092 15 13.9492C15 15.99 12.236 16.5 9 16.5Z" fill="#A6ABC8"/>
    </svg>
  );
};
