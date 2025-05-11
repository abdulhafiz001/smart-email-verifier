const ProgressBar = ({ progress }) => {
    return (
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
        <div
          className="bg-purple-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };
  
  export default ProgressBar;