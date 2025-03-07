import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = jobs.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(jobs.length / recordsPerPage);

  return (
    <>
      <PageMeta
    title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
    description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
  />
  <PageBreadcrumb pageTitle="Candidates Vies" />
    <div className="p-6 bg-[#2A2438] text-white min-h-screen">
      <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Job Listings</h1>
      <div className="bg-[#352F44] shadow-lg p-4 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#5C5470] text-[#DBD8E3]">
                <th className="py-2 px-4">Job ID</th>
                <th className="py-2 px-4">Job Title</th>
                <th className="py-2 px-4">Job Name</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((job) => (
                <tr key={job._id} className="border-b border-gray-600 text-[#DBD8E3]">
                  <td className="py-2 px-4">{job.jobID}</td>
                  <td className="py-2 px-4">{job.jobTitle}</td>
                  <td className="py-2 px-4">{job.jobName}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
                      onClick={() => navigate(`/candidates/${job._id}`)}
                    >
                      View All Candidates
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default JobList;
