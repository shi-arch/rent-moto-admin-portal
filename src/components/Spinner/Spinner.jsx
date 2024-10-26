const Spinner = ({ message }) => {
  return (
    <div className="flex items-center justify-center">
      <span className="mr-2">{message}</span>
      <div className="w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
