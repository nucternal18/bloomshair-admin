import { forwardRef } from 'react';

const Button = forwardRef(({ children, disabled, color, ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    disabled={disabled}
    className={`${colors[color]} ${
      disabled ? 'opacity-60 cursor-not-allowed' : ''
    }  text-white focus:outline-none shadow rounded px-6 py-2 font-medium transition ease-in duration-200`}>
    {children}
  </button>
));

const colors = {
  primary: `border-blue-700 border-2 text-blue-700 active:bg-blue-700 active:text-white`,
  success: `border-green-700 border-2 text-green-700 active:bg-green-700 active:text-white`,
  danger: `border-red-600 border-2 text-red-600 active:bg-red-600 active:text-white`,
  dark: `border-black border-2 text-gray-900 active:bg-black active:text-white`,
  warning: `border-yellow-500 border-2 text-yellow-500 active:bg-yellow-500 active:text-white`,
  indigo: `border-indigo-900 border-2 text-indigo-900 active:bg-indigo-900 active:text-white`,
};

Button.displayName = 'Button';

export default Button;
