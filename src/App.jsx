import { useState } from "react";
import FileUpload from "./components/FileUpload";
import EmailList from "./components/EmailList";
import ProgressBar from "./components/ProgressBar";
import api from './services/api';

function App() {
  const [verified, setVerified] = useState([]);
  const [unverified, setUnverified] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setProgress(0);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/upload', formData);
      setVerified(response.data.verified);
      setUnverified(response.data.unverified);
    } catch (err) {
      console.error('Error.response.data →', err.response?.data);
      setError("Failed to upload or verify emails. Please check your file format.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (emailsToDownload) => {
    const csvContent = `data:text/csv;charset=utf-8,${emailsToDownload.join("\n")}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "emails.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-purple-900 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-purple-400">Smart Email Verifier</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Upload a CSV file of email addresses and instantly verify which are valid, invalid, or temporary. Streamline your outreach by cleaning your email list with one simple upload.
          </p>
        </header>

        <FileUpload onFileUpload={handleFileUpload} />

        {error && (
          <div className="bg-red-500/80 p-4 rounded-lg text-white text-sm shadow-lg">
            ⚠️ {error}
          </div>
        )}

        {isLoading && <ProgressBar progress={progress} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmailList
            title="✅ Verified Emails"
            emails={verified}
            isLoading={isLoading}
            onDownload={() => handleDownload(verified)}
            status="verified"
          />
          <EmailList
            title="⚠️ Unverified / Temporary Emails"
            emails={unverified}
            isLoading={isLoading}
            onDownload={() => handleDownload(unverified)}
            status="unverified"
          />
        </div>

        <footer className="text-center text-xs text-gray-500 pt-10">
          &copy; {new Date().getFullYear()} Smart Email Verifier. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default App;
