import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

const TranscriptPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const location = useLocation();
  const selectedCandidate = location.state.candidate;
  const jobId = location.state.jobId;

  useEffect(() => {
    const fetchPredictedPercentage = async () => {
      try {
        console.log("Fetching job id...", jobId);
        const response = await axios.get(`http://localhost:5000/jobs/${jobId}`);
        console.log(response.data);
        setSelectedJob(response.data);
      } catch (err) {
        // setError("Failed to fetch candidate data.");
      } finally {
        //   setLoading(false);
      }
    };

    fetchPredictedPercentage();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //@ts-ignore
    accept: "application/pdf",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const navigateTo = useNavigate();

  if (!selectedJob) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const jobRole = selectedJob.jobTitle;
    if (!file || !jobRole) {
      toast.error("Please select a file and a job role.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_role", jobRole);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          validateStatus: (status) => status < 500,
        }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      setScore(response.data.score);
    } catch (error) {
      console.error("Error uploading file", error);
      toast.error("Failed to process the file.");
    } finally {
      setLoading(false);
    }
  };

  const saveResultsToDB = async () => {
    if (!selectedCandidate?._id || !score) {
      toast.error("Candidate ID or score not available!");
      return;
    }

    const candidateId = selectedCandidate._id;

    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/api/candidates/${candidateId}/transcript`,
        { transcriptMark: parseInt(score.toString()) },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success("Marks successfully saved to DB!");
      } else {
        toast.error("Failed to save marks.");
      }
    } catch (error) {
      console.error("Error saving marks:", error);
      toast.error("Error occurred while saving.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mt-8 mb-8 text-blue-600">
        Job Application Score Calculator
      </h1>

      {/* Form */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          {/* Drag-and-Drop File Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload PDF Transcript
            </label>
            <div
              {...getRootProps()}
              className={`flex items-center justify-center w-full p-6 border-2 border-dashed rounded-lg ${
                isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              {file ? (
                <p className="text-center">{file.name}</p>
              ) : isDragActive ? (
                <p className="text-center text-blue-500">
                  Drop the file here...
                </p>
              ) : (
                <p className="text-center text-gray-500">
                  Drag and drop a PDF file here, or click to select a file
                </p>
              )}
            </div>
          </div>

          {/* Job Role Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Selected Job Role : {selectedJob.jobTitle}
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-orange-500 py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="green"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Upload and Calculate"
            )}
          </button>
        </form>
      </div>

      {/* Score Display */}
      {score !== null && (
        <div className="mt-8 p-6 bg-green-100 rounded-lg text-center w-full max-w-md">
          <h2 className="text-xl font-semibold text-green-700">
            Final Score: {score}
          </h2>
        </div>
      )}

      <div className="mt-10">
        <button onClick={saveResultsToDB}>Save Results to DB</button>
        <button onClick={() => navigateTo("/")}>Go to Home</button>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default TranscriptPage;
