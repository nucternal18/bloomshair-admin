const FormContainer = ({ children }) => {
  return (
    <div className='container flex flex-col items-center justify-center w-full mx-auto'>
      {children}
    </div>
  );
};

export default FormContainer;
