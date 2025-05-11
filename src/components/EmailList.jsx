const EmailList = ({ title, emails, isLoading, onDownload }) => {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 transition-all">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-purple-400">{title}</h2>
          {emails.length > 0 && (
            <button
              onClick={onDownload}
              className="bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Download CSV
            </button>
          )}
        </div>
  
        {isLoading ? (
          <div className="animate-pulse h-32 bg-gray-700 rounded-lg" />
        ) : emails.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-700">
            {emails.map((email, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                <span className="text-white text-sm">{email}</span>
                <span className="text-green-400 text-lg font-bold">✓</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No emails to display.</p>
        )}
      </div>
    );
  };
  
  export default EmailList;
  