const AddStopOverModal = () => {
  return (
    <div
      onClick={() => {
        setShowReport((prevState) => !prevState);
      }}
      className="absolute flex items-center justify-center w-full h-full overflow-x-hidden bg-tertiary z-9999"
    >
      Modal
    </div>
  );
};

export default Modal;
