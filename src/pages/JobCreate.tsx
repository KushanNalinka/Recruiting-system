

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import PageMeta from '../components/common/PageMeta';
// import PageBreadcrumb from "../components/common/PageBreadCrumb";

// const JobForm = () => {
//   const navigate = useNavigate();
//   const { jobID } = useParams();
//   const [formData, setFormData] = useState({
//     jobID: '',
//     jobTitle: '',
//     jobName: '',
//     jobLocation: '',
//     jobType: 'onsite',
//     jobDepartment: '',
//     qualifications: '',
//     requiredSkills: '',
//     experience: '',
//     duties: '',
//     jobPostedDate: '',
//     jobEndsDate: '',
//   });

//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     if (jobID) {
//       const fetchJob = async () => {
//         const response = await axios.get(`http://localhost:5000/jobs/${jobID}`);
//         setFormData(response.data);
//       };
//       fetchJob();
//     }
//   }, [jobID]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (jobID) {
//       await axios.put(`http://localhost:5000/jobs/${jobID}`, formData);
//       alert('Job updated successfully!');
//     } else {
//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
//       if (file) formDataToSend.append('file', file);

//       await axios.post('http://localhost:5000/jobs', formDataToSend);
//       alert('Job added successfully!');
//     }

//     navigate('/');
//   };

//   return (
//     <>
//       <PageMeta
//         title="React.js Job Form | TailAdmin - React.js Admin Dashboard Template"
//         description="This is a Job Form page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//       />
//       <PageBreadcrumb pageTitle="Job Create Form" />
//       <div className="flex items-center justify-center min-h-screen bg-[#2A2438] p-6">
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.8 }} 
//           animate={{ opacity: 1, scale: 1 }} 
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-4xl bg-[#352F44] p-8 rounded-lg shadow-2xl"
//         >
//           <h1 className="text-3xl font-bold text-center text-[#DBD8E3] mb-6">
//             {jobID ? 'Edit Job' : 'Create New Job'}
//           </h1>
//           <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//             <input type="text" name="jobID" placeholder="Job ID" value={formData.jobID} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
//             <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
//             <input type="text" name="jobName" placeholder="Job Name" value={formData.jobName} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
//             <input type="text" name="jobLocation" placeholder="Job Location" value={formData.jobLocation} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
//             <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white">
//               <option value="onsite">Onsite</option>
//               <option value="remote">Remote</option>
//               <option value="hybrid">Hybrid</option>
//             </select>
//             <input type="text" name="jobDepartment" placeholder="Job Department" value={formData.jobDepartment} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
//             <textarea name="qualifications" placeholder="Qualifications" value={formData.qualifications} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />
//             <textarea name="requiredSkills" placeholder="Required Skills" value={formData.requiredSkills} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />
//             <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />
//             <textarea name="duties" placeholder="Essential Duties" value={formData.duties} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />
//             <input type="date" name="jobPostedDate" value={formData.jobPostedDate} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
//             <input type="date" name="jobEndsDate" value={formData.jobEndsDate} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
//             <input type="file" onChange={handleFileChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />
//             <button type="submit" className="w-full bg-[#DBD8E3] text-black py-3 rounded-lg text-lg font-semibold transition duration-300 col-span-2 hover:bg-[#5C5470] hover:text-white">
//               {jobID ? 'Update Job' : 'Submit'}
//             </button>
//           </form>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default JobForm;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";

const JobForm = () => {
  const navigate = useNavigate();
  const { jobID } = useParams();
  const [formData, setFormData] = useState({
    jobID: "",
    jobTitle: "",
    jobName: "",
    jobLocation: "",
    jobType: "onsite",
    jobDepartment: "",
    qualifications: "",
    requiredSkills: "",
    experience: "",
    duties: "",
    jobDescription: "",
    requiredQualifications: "",
    yearsOfExperience: "",
    jobPostedDate: "",
    jobEndsDate: "",
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (jobID) {
      const fetchJob = async () => {
        const response = await axios.get(`http://localhost:5000/jobs/${jobID}`);
        setFormData(response.data);
      };
      fetchJob();
    }
  }, [jobID]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (jobID) {
      await axios.put(`http://localhost:5000/jobs/${jobID}`, formData);
      alert("Job updated successfully!");
    } else {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
      if (file) formDataToSend.append("file", file);

      await axios.post("http://localhost:5000/jobs", formDataToSend);
      alert("Job added successfully!");
    }

    navigate("/");
  };

  return (
    <>
      <PageMeta
        title="React.js Job Form | TailAdmin - React.js Admin Dashboard Template"
        description="This is a Job Form page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Job Create Form" />
      <div className="flex items-center justify-center min-h-screen bg-[#2A2438] p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-[#352F44] p-8 rounded-lg shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-center text-[#DBD8E3] mb-6">
            {jobID ? "Edit Job" : "Create New Job"}
          </h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input type="text" name="jobID" placeholder="Job ID" value={formData.jobID} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
            <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
            <input type="text" name="jobName" placeholder="Job Name" value={formData.jobName} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
            <input type="text" name="jobLocation" placeholder="Job Location" value={formData.jobLocation} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
            
            <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white">
              <option value="onsite">Onsite</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>

            <input type="text" name="jobDepartment" placeholder="Job Department" value={formData.jobDepartment} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />

            {/* Additional Fields */}
            <input type="text" name="yearsOfExperience" placeholder="Years of Experience" value={formData.yearsOfExperience} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
            <textarea name="jobDescription" placeholder="Job Description" value={formData.jobDescription} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />
            <textarea name="requiredQualifications" placeholder="Required Qualifications" value={formData.requiredQualifications} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

            <textarea name="qualifications" placeholder="Qualifications" value={formData.qualifications} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />
            <textarea name="requiredSkills" placeholder="Required Skills" value={formData.requiredSkills} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />
            <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />
            <textarea name="duties" placeholder="Essential Duties" value={formData.duties} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

            <input type="date" name="jobPostedDate" value={formData.jobPostedDate} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
            <input type="date" name="jobEndsDate" value={formData.jobEndsDate} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />

            <input type="file" onChange={handleFileChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />
            <button type="submit" className="w-full bg-[#DBD8E3] text-black py-3 rounded-lg text-lg font-semibold transition duration-300 col-span-2 hover:bg-[#5C5470] hover:text-white">
              {jobID ? "Update Job" : "Submit"}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default JobForm;

