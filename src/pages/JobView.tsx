// import { useEffect, useState } from "react";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// const JobUpdatePopup = ({ job, onUpdate, onClose }) => {
//   const [formData, setFormData] = useState({
//     jobTitle: job.jobTitle,
//     jobLocation: job.jobLocation,
//     jobType: job.jobType,
//     jobName: job.jobName,
//     jobDepartment: job.jobDepartment,
//     qualifications: job.qualifications,
//     requiredSkills: job.requiredSkills,
//     experience: job.experience,
//     duties: job.duties,
//     file: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     for (const key in formData) {
//       form.append(key, formData[key]);
//     }

//     try {
//       await axios.put(`http://localhost:5000/jobs/${job._id}`, form);
//       onUpdate();
//       onClose();
//     } catch (error) {
//       console.error("Error updating job:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-[#352F44] p-6 rounded-lg shadow-lg w-96 text-[#DBD8E3]">
//         <h2 className="text-xl font-bold mb-4">Update Job</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input className="w-full p-2 rounded bg-[#5C5470] text-white" type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" />
//           <input className="w-full p-2 rounded bg-[#5C5470] text-white" type="text" name="jobLocation" value={formData.jobLocation} onChange={handleChange} placeholder="Job Location" />
//           <input className="w-full p-2 rounded bg-[#5C5470] text-white" type="text" name="jobType" value={formData.jobType} onChange={handleChange} placeholder="Job Type" />
//           <input className="w-full p-2 rounded bg-[#5C5470] text-white" type="file" name="file" onChange={handleFileChange} />
//           <button type="submit" className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg w-full">Update Job</button>
//         </form>
//         <button className="mt-3 w-full bg-red-500 text-white py-2 rounded" onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 10;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/jobs");
//         setJobs(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleDelete = async (jobId) => {
//     try {
//       await axios.delete(`http://localhost:5000/jobs/${jobId}`);
//       setJobs(jobs.filter((job) => job._id !== jobId));
//     } catch (error) {
//       console.error("Error deleting job:", error);
//     }
//   };

//   const handleUpdate = (job) => {
//     setSelectedJob(job);
//   };

//   const handleClosePopup = () => {
//     setSelectedJob(null);
//   };

//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(jobs.length / jobsPerPage);

//   return (
//     <>
//       <PageMeta
//     title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
//     description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//   />
//   <PageBreadcrumb pageTitle="All Jobs" />
//     <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//       <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Job List</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentJobs.map((job) => (
//           <div key={job._id} className="bg-[#352F44] p-6 rounded-lg shadow-lg text-[#DBD8E3]">
//             <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
//             <p><strong>Location:</strong> {job.jobLocation}</p>
//             <p><strong>Type:</strong> {job.jobType}</p>
//             <button className="bg-red-500 text-white px-4 py-2 rounded mt-3" onClick={() => handleDelete(job._id)}>Delete</button>
//             <button className="bg-[#DBD8E3] text-black px-4 py-2 rounded mt-3 ml-2" onClick={() => handleUpdate(job)}>Update</button>
//           </div>
//         ))}
//       </div>
//       {/* Pagination */}
//       <div className="flex justify-center mt-4">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index + 1}
//             className={`mx-1 px-4 py-2 rounded-lg ${
//               currentPage === index + 1 ? "bg-[#DBD8E3] text-black" : "bg-[#5C5470] text-white"
//             } hover:bg-[#DBD8E3] hover:text-black`}
//             onClick={() => setCurrentPage(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//       {selectedJob && <JobUpdatePopup job={selectedJob} onUpdate={() => setJobs([...jobs])} onClose={handleClosePopup} />}
//     </div>
//     </>
//   );
// };

// export default JobList;

import { useEffect, useState } from "react";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const JobUpdatePopup = ({ job, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    jobTitle: job.jobTitle || "",
    jobLocation: job.jobLocation || "",
    jobType: job.jobType || "",
    jobName: job.jobName || "",
    jobDepartment: job.jobDepartment || "",
    qualifications: job.qualifications || "",
    requiredSkills: job.requiredSkills || "",
    experience: job.experience || "",
    duties: job.duties || "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await axios.put(`http://localhost:5000/jobs/${job._id}`, form);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#352F44] p-6 rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-auto text-[#DBD8E3]">
        <h2 className="text-xl font-bold mb-4">Update Job</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {Object.keys(formData).map((key) =>
            key !== "file" ? (
              <input
                key={key}
                className="w-full p-2 rounded bg-[#5C5470] text-white"
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={key.replace(/([A-Z])/g, " $1")}
              />
            ) : (
              <input
                key={key}
                className="w-full p-2 rounded bg-[#5C5470] text-white"
                type="file"
                name={key}
                onChange={handleFileChange}
              />
            )
          )}
          <button type="submit" className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg w-full">
            Update Job
          </button>
        </form>
        <button className="mt-3 w-full bg-red-500 text-white py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const JobDetailsPopup = ({ job, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#352F44] p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-auto text-[#DBD8E3]">
        <h2 className="text-xl font-bold mb-4">{job.jobTitle}</h2>
        <table className="w-full border-collapse border border-gray-500">
          <tbody>
            {Object.entries(job).map(([key, value]) => (
              <tr key={key}>
                <td className="p-2 border border-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
                <td className="p-2 border border-gray-500">{value || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-3 w-full bg-red-500 text-white py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewJob, setViewJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

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

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <>
      <PageMeta title="Job List" description="List of available jobs" />
      <PageBreadcrumb pageTitle="All Jobs" />
      <div className="p-6 bg-[#2A2438] text-white min-h-screen">
        <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Job List</h1>
        <table className="w-full border-collapse border border-gray-500 text-[#DBD8E3]">
          <thead>
            <tr className="bg-[#5C5470] text-[#DBD8E3]">
              <th className="py-2 px-4 border border-gray-500">Job Title</th>
              <th className="py-2 px-4 border border-gray-500">Location</th>
              <th className="py-2 px-4 border border-gray-500">Type</th>
              <th className="py-2 px-4 border border-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.map((job) => (
              <tr key={job._id} className="border border-gray-500 hover:bg-[#5C5470] transition">
                <td className="p-2 border">{job.jobTitle}</td>
                <td className="p-2 border">{job.jobLocation}</td>
                <td className="p-2 border">{job.jobType}</td>
                <td className="p-2 flex space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setViewJob(job)}>
                    View More
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => setSelectedJob(job)}>
                    Update
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(job._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        {selectedJob && <JobUpdatePopup job={selectedJob} onUpdate={() => setJobs([...jobs])} onClose={() => setSelectedJob(null)} />}
        {viewJob && <JobDetailsPopup job={viewJob} onClose={() => setViewJob(null)} />}
      </div>
    </>
  );
};

export default JobList;



