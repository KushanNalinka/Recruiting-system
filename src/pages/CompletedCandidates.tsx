// import { useEffect, useState } from "react";
// import { useParams,useNavigate } from "react-router-dom";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// const FinalizedCandidates = () => {
//   const { jobId } = useParams();
//   const [candidates, setCandidates] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFinalizedCandidates = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/candidates/job/${jobId}`);
//         const sortedCandidates = response.data
//           .filter((candidate) => candidate.finalized_matching_percentage) // Only include candidates with a final score
//           .sort((a, b) => b.finalized_matching_percentage - a.finalized_matching_percentage); // Rank highest first

//         setCandidates(sortedCandidates);
//       } catch (error) {
//         setError("Failed to fetch finalized candidates.");
//       }
//     };

//     fetchFinalizedCandidates();
//   }, [jobId]);

//   // Pagination logic
//   const totalPages = Math.ceil(candidates.length / recordsPerPage);
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = candidates.slice(indexOfFirstRecord, indexOfLastRecord);

//   return (
//     <>
//       <PageMeta title="Finalized Completed Candidates" description="List of candidates with final scores" />
//       <PageBreadcrumb pageTitle="Finalized Completed Candidates" />

//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//       <button
//           className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>
//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Finalized Ranked Completed Candidates</h1>

//         {error ? (
//           <p className="text-red-400 font-semibold">{error}</p>
//         ) : (
//           <div className="bg-[#352F44] shadow-lg p-4 rounded-lg">
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-[#5C5470] text-[#DBD8E3]">
//                     <th className="py-2 px-4">Rank</th>
//                     <th className="py-2 px-4">First Name</th>
//                     <th className="py-2 px-4">Last Name</th>
//                     <th className="py-2 px-4">Email</th>
//                     <th className="py-2 px-4">Predicted Matching %</th>
//                     <th className="py-2 px-4">GitHub/LinkedIn/Transcript Matching %</th>
//                     <th className="py-2 px-4">Finalized Matching %</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentRecords.map((candidate, index) => (
//                     <tr key={candidate._id} className="border-b border-gray-600 text-[#DBD8E3]">
//                       <td className="py-2 px-4 font-bold">{index + 1 + (currentPage - 1) * recordsPerPage}</td>
//                       <td className="py-2 px-4">{candidate.firstName}</td>
//                       <td className="py-2 px-4">{candidate.lastName}</td>
//                       <td className="py-2 px-4">{candidate.confirmEmail}</td>
//                       <td className="py-2 px-4 font-bold text-[#FFA500]">
//                         {candidate.predicted_matching_percentage || "N/A"}%
//                       </td>
//                       <td className="py-2 px-4 font-bold text-[#2196F3]">
//                         {candidate.github_linkedin_transcript_matching_percentage || "N/A"}%
//                       </td>
//                       <td className="py-2 px-4 font-bold text-[#4CAF50]">
//                         {candidate.finalized_matching_percentage || "N/A"}%
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="flex justify-center mt-4">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               className={`mx-1 px-4 py-2 rounded-lg ${
//                 currentPage === index + 1 ? "bg-[#DBD8E3] text-black" : "bg-[#5C5470] text-white"
//               } hover:bg-[#DBD8E3] hover:text-black`}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default FinalizedCandidates;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const FinalizedCandidates = () => {
  const { jobId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFinalizedCandidates = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/candidates/job/${jobId}`);

        const sortedCandidates = response.data
          .filter((candidate) => candidate.finalized_score) // Only include candidates with a finalized score
          .map((candidate) => ({
            ...candidate,
            github_linkedin_transcript_avg: calculateAverageMarks(candidate), // Calculate avg marks
          }))
          .sort((a, b) => b.finalized_score - a.finalized_score); // Rank highest finalized_score first

        setCandidates(sortedCandidates);
      } catch (error) {
        setError("Failed to fetch finalized candidates.");
      }
    };

    fetchFinalizedCandidates();
  }, [jobId]);

  // Function to calculate GitHub/LinkedIn/Transcript Matching Percentage
  const calculateAverageMarks = (candidate) => {
    const githubMarks = candidate.github_marks || 0;
    const linkedinMarks = candidate.linkedin_marks || 0;
    const transcriptMarks = candidate.transcript_marks || 0;

    return ((githubMarks + linkedinMarks + transcriptMarks) / 3).toFixed(2); // Round to 2 decimal places
  };

  // Pagination logic
  const totalPages = Math.ceil(candidates.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = candidates.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <>
      <PageMeta title="Finalized Completed Candidates" description="List of candidates with final scores" />
      <PageBreadcrumb pageTitle="Finalized Completed Candidates" />

      <div className="p-6 bg-[#2A2438] text-white min-h-screen">
        <button
          className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Finalized Ranked Completed Candidates</h1>

        {error ? (
          <p className="text-red-400 font-semibold">{error}</p>
        ) : (
          <div className="bg-[#352F44] shadow-lg p-4 rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#5C5470] text-[#DBD8E3]">
                    <th className="py-2 px-4">Rank</th>
                    <th className="py-2 px-4">First Name</th>
                    <th className="py-2 px-4">Last Name</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Predicted Matching %</th>
                    <th className="py-2 px-4">GitHub/LinkedIn/Transcript Matching %</th>
                    <th className="py-2 px-4">Finalized Matching %</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((candidate, index) => (
                    <tr key={candidate._id} className="border-b border-gray-600 text-[#DBD8E3]">
                      <td className="py-2 px-4 font-bold">
                        {index + 1 + (currentPage - 1) * recordsPerPage}
                      </td>
                      <td className="py-2 px-4">{candidate.firstName}</td>
                      <td className="py-2 px-4">{candidate.lastName}</td>
                      <td className="py-2 px-4">{candidate.confirmEmail}</td>
                      <td className="py-2 px-4 font-bold text-[#FFA500]">
                        {candidate.predicted_matching_percentage || "N/A"}%
                      </td>
                      <td className="py-2 px-4 font-bold text-[#2196F3]">
                        {candidate.github_linkedin_transcript_avg || "N/A"}%
                      </td>
                      <td className="py-2 px-4 font-bold text-[#4CAF50]">
                        {candidate.finalized_score || "N/A"}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`mx-1 px-4 py-2 rounded-lg ${
                currentPage === index + 1 ? "bg-[#DBD8E3] text-black" : "bg-[#5C5470] text-white"
              } hover:bg-[#DBD8E3] hover:text-black`}
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

export default FinalizedCandidates;
