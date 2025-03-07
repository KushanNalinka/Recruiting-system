import  {useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMeta from '../components/common/PageMeta';
import PageBreadcrumb from "../components/common/PageBreadCrumb";

const JobForm = () => {
  const navigate = useNavigate();
  const { jobID } = useParams();
  const [formData, setFormData] = useState({
    jobID: '',
    jobTitle: '',
    jobName: '',
    jobLocation: '',
    jobType: 'onsite',
    jobDepartment: '',
    qualifications: '',
    requiredSkills: '',
    experience: '',
    duties: '',
    jobPostedDate: '',
    jobEndsDate: '',
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
      alert('Job updated successfully!');
    } else {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
      if (file) formDataToSend.append('file', file);

      await axios.post('http://localhost:5000/jobs', formDataToSend);
      alert('Job added successfully!');
    }

    navigate('/');
  };

  return (
    <>
    <PageMeta
    title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
    description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
  />
  <PageBreadcrumb pageTitle="Job Create Form" />
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          {jobID ? 'Edit Job' : 'Create New Job'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="jobID" placeholder="Job ID" value={formData.jobID} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <input type="text" name="jobName" placeholder="Job Name" value={formData.jobName} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <input type="text" name="jobLocation" placeholder="Job Location" value={formData.jobLocation} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full p-3 border rounded-lg">
            <option value="onsite">Onsite</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
          <input type="text" name="jobDepartment" placeholder="Job Department" value={formData.jobDepartment} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <textarea name="qualifications" placeholder="Qualifications" value={formData.qualifications} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <textarea name="requiredSkills" placeholder="Required Skills" value={formData.requiredSkills} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <textarea name="duties" placeholder="Essential Duties" value={formData.duties} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input type="date" name="jobPostedDate" value={formData.jobPostedDate} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <input type="date" name="jobEndsDate" value={formData.jobEndsDate} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <input type="file" onChange={handleFileChange} className="w-full p-3 border rounded-lg" />
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-300">
            {jobID ? 'Update Job' : 'Submit'}
          </button>
        </form>
      </motion.div>
    </div>
    </>
  );
};

export default JobForm;
