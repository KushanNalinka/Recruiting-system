import  { useEffect, useState } from "react";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const CandidateView = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:5000/candidates")
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
      });
  }, []);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = candidates.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(candidates.length / recordsPerPage);

  return (
    <>
    <PageMeta
  title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
  description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
/>
<PageBreadcrumb pageTitle="All Candidates" />
    <div className="p-6 bg-[#2A2438] text-white min-h-screen">
      <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Candidates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRecords.map((candidate) => (
          <div key={candidate._id} className="bg-[#352F44] shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-[#DBD8E3]">{candidate.firstName} {candidate.lastName}</h2>
            <p className="text-[#DBD8E3]"><strong>Email:</strong> {candidate.email}</p>
            <p className="text-[#DBD8E3]"><strong>LinkedIn:</strong> <a href={candidate.linkedIn} target="_blank" rel="noopener noreferrer" className="text-[#DBD8E3] underline">{candidate.linkedIn}</a></p>
            <p className="text-[#DBD8E3]"><strong>GitHub:</strong> <a href={candidate.github} target="_blank" rel="noopener noreferrer" className="text-[#DBD8E3] underline">{candidate.github}</a></p>
            <p className="text-[#DBD8E3]"><strong>Message:</strong> {candidate.message}</p>
            <h3 className="text-lg font-semibold text-[#DBD8E3] mt-4">Experience</h3>
            {candidate.experience.map((exp, index) => (
              <div key={index} className="text-[#DBD8E3] border-b border-gray-600 pb-2 mb-2">
                <p><strong>Title:</strong> {exp.title}</p>
                <p><strong>Company:</strong> {exp.company}</p>
                <p><strong>From:</strong> {exp.from} - <strong>To:</strong> {exp.to}</p>
              </div>
            ))}
            <h3 className="text-lg font-semibold text-[#DBD8E3] mt-4">Education</h3>
            {candidate.education.map((edu, index) => (
              <div key={index} className="text-[#DBD8E3] border-b border-gray-600 pb-2 mb-2">
                <p><strong>Institution:</strong> {edu.institution}</p>
                <p><strong>Degree:</strong> {edu.degree}</p>
                <p><strong>Major:</strong> {edu.major}</p>
              </div>
            ))}
            <h3 className="text-lg font-semibold text-[#DBD8E3] mt-4">Skills</h3>
            <ul className="list-disc list-inside text-[#DBD8E3]">
              {candidate.soft_skills && candidate.soft_skills.map((skill, index) => (
                <li key={index}>{skill.skill} ({skill.count})</li>
              ))}
            </ul>
            <p className="text-[#DBD8E3] mt-2"><strong>Similarity Score:</strong> {candidate.similarity_score}</p>
          </div>
        ))}
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

export default CandidateView;
