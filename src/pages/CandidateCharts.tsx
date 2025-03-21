
 

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const CandidateCharts = () => {
  const { candidateID } = useParams();
  const navigate = useNavigate();
  const [charts, setCharts] = useState({});
  const [error, setError] = useState("");
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/candidates/charts/${candidateID}`
        );
        setCharts(response.data.charts);
      } catch (error) {
        setError("Failed to load charts.");
        console.error("Error fetching charts:", error);
      }
    };
    fetchCharts();
  }, [candidateID]);

  return (
    <>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Candidates Views" />

      <div className="p-6 bg-[#2A2438] text-white min-h-screen">
        <button
          className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>

        <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4 text-center">
          Candidate Charts
        </h1>

        {error ? (
          <p className="text-red-400 font-semibold text-center">{error}</p>
        ) : selectedChart ? (
          // Enlarged chart view inside the designated section
          <div className="bg-[#352F44] p-6 rounded-lg shadow-lg text-center">
            <button
              className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white mb-4"
              onClick={() => {
                setSelectedChart(null);
                setSelectedCategory(null);
              }}
            >
              Back to Charts
            </button>
            <h3 className="text-2xl font-semibold text-[#DBD8E3] mb-4">
              {selectedCategory}
            </h3>
            <img
              className="rounded-lg max-w-full max-h-[500px] mx-auto border border-[#DBD8E3]"
              src={`data:image/png;base64,${selectedChart}`}
              alt={`${selectedCategory} Chart`}
            />
          </div>
        ) : (
          // Default grid view of all charts
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(charts).map(([category, data]) => (
              <div
                key={category}
                className="bg-[#352F44] p-4 rounded-lg shadow-lg text-[#DBD8E3] text-center cursor-pointer"
                onClick={() => {
                  setSelectedChart(data.chart);
                  setSelectedCategory(category);
                }}
              >
                <h3 className="text-lg font-semibold">{category}</h3>
                {data.chart ? (
                  <img
                    className="mt-2 rounded-lg border border-[#DBD8E3]"
                    src={`data:image/png;base64,${data.chart}`}
                    alt={`${category} Chart`}
                  />
                ) : (
                  <p className="text-[#DBD8E3]">No chart available</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CandidateCharts;
