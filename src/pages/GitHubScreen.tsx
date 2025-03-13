import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const FinalCandidate = () => {
  const { id } = useParams(); // Get Candidate ID from URL
  const [predictedPercentage, setPredictedPercentage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPredictedPercentage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/candidates/${id}`
        );
        setPredictedPercentage(response.data.predicted_matching_percentage);
      } catch (err) {
        setError("Failed to fetch predicted percentage.");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictedPercentage();
  }, [id]);

  return (
    <>
      <PageMeta title="Finalized Candidate" description="Final Matching Percentage" />
      <PageBreadcrumb pageTitle="Finalized Candidate" />

      <div className="p-6 bg-[#2A2438] text-white min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#DBD8E3] mb-6">Finalized Matching Percentage</h1>

        {loading ? (
          <p className="text-lg text-[#DBD8E3]">Loading...</p>
        ) : error ? (
          <p className="text-red-400 text-lg">{error}</p>
        ) : (
          <div className="bg-[#352F44] p-6 rounded-lg shadow-lg text-center w-1/2">
            <h2 className="text-2xl font-semibold text-[#DBD8E3]">GitHub Screening of Candidate ID: {id}</h2>
            <p className="text-xl font-semibold text-[#DBD8E3] mt-4">Predicted Matching Percentage</p>
            <div className="mt-4 text-4xl font-bold text-[#4CAF50]">
              {predictedPercentage ? `${predictedPercentage}%` : "N/A"}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FinalCandidate;