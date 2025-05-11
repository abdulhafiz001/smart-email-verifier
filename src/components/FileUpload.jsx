import { useState } from "react";

const FileUpload = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    console.log("file uploaded", file);
    onFileUpload(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-10 bg-gray-800 text-center text-gray-300 transition-colors duration-300 ${
        dragActive ? "border-purple-500 bg-gray-700" : "border-gray-600"
      }`}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragActive(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
      }}
    >
      <input
        type="file"
        id="fileInput"
        name="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-600 text-white text-2xl font-bold">
            +
          </div>
          <p className="text-sm">
            Drag and drop your <span className="text-purple-400">CSV file</span> here or{" "}
            <span className="underline text-purple-400">browse</span>
          </p>
        </div>
      </label>
    </div>
  );
};

export default FileUpload;
