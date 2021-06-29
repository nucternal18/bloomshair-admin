const ErrorMessage = ({ children, variant }) => {
  const color = {
    success: 'text-green-500',
    danger: 'text-red-500',
  };
  return (
    <div className={`${color[variant]} py-2 text-lg italic text-center`}>
      {children}
    </div>
  );
};

export default ErrorMessage;
