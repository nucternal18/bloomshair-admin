const FormContainer = ({ children }) => {
  return (
    <div className='container flex flex-col mx-auto justify-content item-center'>
      {children}
    </div>
  );
};

export default FormContainer;
