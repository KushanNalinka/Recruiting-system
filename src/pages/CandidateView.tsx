

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/candidates")
      .then((response) => {
        setCandidates(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
      });
  }, []);

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = candidates.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(candidates.length / recordsPerPage);

  return (
    <>
      <PageMeta title="Candidates List" description="View all candidates" />
      <PageBreadcrumb pageTitle="All Candidates" />

      <div className="p-6 bg-[#2A2438] text-white min-h-screen">
        <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4 text-center">Candidates</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#352F44] text-[#DBD8E3] rounded-lg">
            <thead>
              <tr className="border-b border-gray-600 text-left">
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Job Position</th>
                <th className="p-3">Job Title</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((candidate) => (
                <tr key={candidate._id} className="border-b border-gray-700">
                  <td className="p-3">{candidate.firstName}</td>
                  <td className="p-3">{candidate.lastName}</td>
                  <td className="p-3">{candidate.confirmEmail}</td>
                  <td className="p-3">{candidate.jobPosition}</td>
                  <td className="p-3">{candidate.jobTitle}</td>
                  <td className="p-3 text-center">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                     // onClick={() => navigate(`/candidate/${candidate._id}`)}
                      onClick={() => {navigate(`/single/candidate/${candidate._id}`)
                    }}
                    >
                      View More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

export default CandidateList;
