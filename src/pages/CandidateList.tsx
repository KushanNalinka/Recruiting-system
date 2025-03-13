

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const CandidatesList = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/candidates/job/${jobId}`
        );
        const sortedCandidates = response.data.sort((a, b) => {
          return (
            b.projectsMatchingSimilarity - a.projectsMatchingSimilarity ||
            b.workExperienceMatchingSimilarity - a.workExperienceMatchingSimilarity ||
            b.coursesAndCertificationMatchingSimilarity - a.coursesAndCertificationMatchingSimilarity ||
            b.achievements_similarity - a.achievements_similarity ||
            b.num_of_tools_technologies - a.num_of_tools_technologies
          );
        });
        setCandidates(sortedCandidates);
      } catch (error) {
        setError("No candidates found for this job.");
      }
    };
    fetchCandidates();
  }, [jobId]);

  const handlePredict = async (candidateID) => {
    try {
      await axios.get(
        `http://localhost:5000/candidates/predict/${candidateID}`
      );
      await fetchPredictedPercentage(candidateID); // Immediately fetch updated value
    } catch (error) {
      alert("Prediction failed.");
    }
  };

  const fetchPredictedPercentage = async (candidateID) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/candidates/predicted_percentage/${candidateID}`
      );
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate._id === candidateID
            ? { ...candidate, predicted_matching_percentage: response.data.predicted_matching_percentage }
            : candidate
        )
      );
    } catch (error) {
      console.error("Error fetching predicted percentage", error);
    }
  };

  const handleViewMore = async (candidateID) => {
    try {
      await axios.post(
        `http://localhost:5000/candidates/generate_charts/${candidateID}`
      );
      navigate(`/candidate-charts/${candidateID}`);
    } catch (error) {
      console.error("Error generating charts:", error);
      alert("Failed to generate charts.");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(candidates.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = candidates.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <>
      <PageMeta title="Candidates List" description="Candidates Page" />
      <PageBreadcrumb pageTitle="Candidates Views" />
      
      <div className="p-6 bg-[#2A2438] text-white min-h-screen">
        
        
        <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Applied Candidates</h1>
        <button
          className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        {error ? (
          <p className="text-red-400 font-semibold">{error}</p>
        ) : (
          <div className="bg-[#352F44] shadow-lg p-4 rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#5C5470] text-[#DBD8E3]">
                    <th className="py-2 px-4">First Name</th>
                    <th className="py-2 px-4">Last Name</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Projects %</th>
                    <th className="py-2 px-4">Experience %</th>
                    <th className="py-2 px-4">Courses %</th>
                    <th className="py-2 px-4">Achievement %</th>
                    <th className="py-2 px-4">Technologies</th>
                    <th className="py-2 px-4">Predicted %</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((candidate) => (
                    <tr key={candidate._id} className="border-b border-gray-600 text-[#DBD8E3]">
                      <td className="py-2 px-4">{candidate.firstName}</td>
                      <td className="py-2 px-4">{candidate.lastName}</td>
                      <td className="py-2 px-4">{candidate.confirmEmail}</td>
                      <td className="py-2 px-4">{candidate.projectsMatchingSimilarity}</td>
                      <td className="py-2 px-4">{candidate.workExperienceMatchingSimilarity}</td>
                      <td className="py-2 px-4">{candidate.coursesAndCertificationMatchingSimilarity}</td>
                      <td className="py-2 px-4">{candidate.achievements_similarity}</td>
                      <td className="py-2 px-4">{candidate.num_of_tools_technologies}</td>
                      <td className="py-2 px-4">{candidate.predicted_matching_percentage || "N/A"}</td>
                      <td className="py-2 px-4">
  <div className="flex gap-2 justify-center">
    <button
      className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
      onClick={() => handlePredict(candidate._id)}
    >
      Predict
    </button>
    <button
      className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
      onClick={() => handleViewMore(candidate._id)}
    >
      Charts
    </button>
    <button
      className="bg-[#5C5470] text-white px-4 py-2 rounded-lg hover:bg-[#DBD8E3] hover:text-black"
      onClick={() => navigate(`/single/candidate/${candidate._id}`)}
    >
      View
    </button>
    <button
      className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#2E7D32]"
      onClick={() => navigate(`/single/finalized/${candidate._id}`)}
    >
      Matched
    </button>
    <button
      className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#2E7D32]"
      onClick={() => navigate(`/single/linkedin/${candidate._id}`)}
    >
      Linkedin
    </button>
    <button
      className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#2E7D32]"
      onClick={() => navigate(`/single/github/${candidate._id}`)}
    >
      GitHub
    </button>
    <button
      className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#2E7D32]"
      onClick={() => navigate(`/single/transcript/${candidate._id}`)}
    >
      Transcript
    </button>
  </div>
</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded-lg ${currentPage === index + 1 ? "bg-[#5C5470] text-white" : "bg-[#DBD8E3] text-black"}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CandidatesList;
