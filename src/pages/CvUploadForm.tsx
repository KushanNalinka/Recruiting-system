import  { useState, useEffect } from "react";
import axios from 'axios';
import image1 from '../assets/images/recruitment-agency-logo-vector.jpg';
import { useParams, useNavigate } from 'react-router-dom';
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const generateCandidateId = () => {
  return Math.random().toString(36).substring(2, 17);
};

const JobApplicationForm = () => {
    const { jobID } = useParams(); 
    const [job, setJob] = useState(null);
    const [resume, setResume] = useState(null);
    const [transcript, setTranscript] = useState(null);
    const [experienceCards, setExperienceCards] = useState([]);
    const [educationCards, setEducationCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      contactNumber: "", // Added Contact Number
      noOfYearsExperience: "", // Added No of Years of Experience
      experience: [],
      education: [],
      linkedIn: "",
      github: "",
      twitter: "",
      website: "",
      message: "",
      rightToWork: '',
      vacancySource: '',
      employerChoice: '',
      employerExpectations: '',
      salaryRange: '',
      consent: false,
      privacyPolicy: false,
      jobID: jobID,
      jobTitle: "",
      candidateId: generateCandidateId(), // Add candidateId field
    });
    // Function to generate a random string of 15 characters

 const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
      };
    
      const handleTranscriptChange = (e) => {
        setTranscript(e.target.files[0]);
      };
    
      const addExperienceCard = () => {
        setExperienceCards([
          ...experienceCards,
          { 
            id: Date.now(),
            title: '', 
            company: '',
            officeLocation: '',
            description: '', 
            from: '', 
            to: '', 
            currentlyWorkHere: false
          },
        ]);
      };
    
      const removeExperienceCard = (id) => {
        setExperienceCards(experienceCards.filter((card) => card.id !== id));
      };
    
      const handleExperienceChange = (id, field, value) => {
        const updatedExperience = experienceCards.map((card) =>
          card.id === id ? { ...card, [field]: value } : card
        );
        setExperienceCards(updatedExperience);
        setFormData({ ...formData, experience: updatedExperience });
      };
    
      const addEducationCard = () => {
        setEducationCards([
          ...educationCards,
          {
            id: Date.now(),
            institution: '',
            degree: '',
            major: '',
            location: '',
            description: '',
            from: '',
            to: '',
            currentlyAttend: false,
          },
        ]);
      };
    
      const removeEducationCard = (id) => {
        setEducationCards(educationCards.filter((card) => card.id !== id));
      };
    
      const handleEducationChange = (id, field, value) => {
        const updatedEducation = educationCards.map((card) =>
          card.id === id ? { ...card, [field]: value } : card
        );
        setEducationCards(updatedEducation);
        setFormData({ ...formData, education: updatedEducation });
      };
  // Next page
  const nextPage = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    }
  };

  // const nextPage = () => {
  //   if (currentPage === 1) {
  //     if (!formData.firstName || !formData.lastName || !formData.email || !formData.confirmEmail || !formData.linkedIn || !formData.github || !resume) {
  //       alert("Please fill all required fields before proceeding.");
  //       return;
  //     }
  //   }
  //   setCurrentPage(currentPage + 1);
  // };

  // Previous page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle form input changes
 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle consent and privacy policy checkboxes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };
  // const handleSubmit = () => {
  //   // Handle form submission logic, for example, sending to a server
  //   console.log("Form data submitted:", formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show alert and navigate before sending the request
  alert('Form has been submitted successfully!');
  //navigate(`/confirmation/${formData.candidateId}`);
  navigate(`/confirmation/${formData.candidateId}/${formData.jobID}`);


    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== 'experience' && key !== 'education') {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (resume) {
      formDataToSend.append('resume', resume);
    }

    if (transcript) {
      formDataToSend.append('transcript', transcript);
    }

    formDataToSend.append('experience', JSON.stringify(formData.experience));
    formDataToSend.append('education', JSON.stringify(formData.education));

    try {
      const response = await axios.post('http://localhost:5000/candidates', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  // Submit handler
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/jobs/${jobID}`);
        setJob(response.data);
        // Update formData with jobTitle
        setFormData((prevData) => ({
          ...prevData,
          jobTitle: response.data.jobTitle, // Append jobTitle to formData
        }));
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
  }, [jobID]);

  if (!job) {
    return <div>Loading...</div>;
  }



  return (
    <>
    <PageMeta
      title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
      description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
    />
    <PageBreadcrumb pageTitle="All Candidates" />
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {currentPage === 1 && (
        <>
          {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <img
          src={image1}
          alt="IFS Logo"
          className="h-12"
        />
        <div className="text-right">
          <h2 className="text-xl font-bold">
           {job.jobID},{job.jobTitle},{job.jobName}
          </h2>
          <p className="text-gray-600">{job.jobLocation}</p>
        </div>
      </div>

      {/* Easy Apply Section */}
     {/*} <div className="mb-6">
        <h3 className="text-lg font-semibold">Easy Apply</h3>
        <p className="text-gray-600 mb-2">
          Choose an option to autocomplete your application. You can still fill
          your profile manually.
        </p>

        <div className="border-dashed border-2 border-gray-400 rounded-md p-4 flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Select file, or drop file here
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          {file && <p className="mt-2 text-gray-600">{file.name}</p>}
        </div>
      </div>*/}

      {/* LinkedIn and Indeed Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800">
          Apply With LinkedIn
        </button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Apply With Indeed
        </button>
      </div>

      {/* Personal Information Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="confirm-email" className="block text-sm font-medium text-gray-700">
              Confirm Your Email *
            </label>
            <input
             id="confirm-email"
             name="confirmEmail"
             type="email"
             className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
             value={formData.confirmEmail}
             onChange={handleInputChange}
             required
            />
          </div>
          <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number *</label>
                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
              </div>

              <div >
            <label className="block text-sm font-semibold">No of Years of Experience *</label>
            <input type="number" name="noOfYearsExperience" value={formData.noOfYearsExperience} onChange={handleInputChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
        </form>
      </div>

          {/* Experience Section */}
          {/* Experience Section */}
          <div className="mt-10">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Experience</h3>
              <button
                onClick={addExperienceCard}
                className="text-purple-700 border border-purple-700 py-1 px-4 rounded-lg hover:bg-purple-100"
              >
                + Add
              </button>
            </div>
          {/* Render all Experience Cards */}
          {experienceCards.map((card) => (
              <div
                key={card.id}
                className="border border-gray-300 bg-gray-50 rounded-lg p-6 mt-4"
              >
                <h4 className="text-sm font-medium mb-4">Fields marked with * are required.</h4>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`title-${card.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title *
                    </label>
                    <input
                      id={`title-${card.id}`}
                      name={`title-${card.id}`}
                      type="text"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      value={card.title}
                      onChange={(e) => handleExperienceChange(card.id, "title", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`company-${card.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company *
                    </label>
                    <input
                      id={`company-${card.id}`}
                      name={`company-${card.id}`}
                      type="text"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      value={card.company}
                      onChange={(e) => handleExperienceChange(card.id, "company", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`location-${card.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location *
                    </label>
                    <input
                      id={`location-${card.id}`}
                      name={`location-${card.id}`}
                      type="text"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      value={card.location}
                      onChange={(e) => handleExperienceChange(card.id, "officeLocation", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`description-${card.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id={`description-${card.id}`}
                      name={`description-${card.id}`}
                      rows="4"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      value={card.description}
                      onChange={(e) => handleExperienceChange(card.id, "description", e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`from-${card.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      From *
                    </label>
                    <input
                      id={`from-${card.id}`}
                      name={`from-${card.id}`}
                      type="date"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      value={card.from}
                      onChange={(e) => handleExperienceChange(card.id, "from", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`to-${card.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      To *
                    </label>
                    <input
                      id={`to-${card.id}`}
                      name={`to-${card.id}`}
                      type="date"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      value={card.to}
                      onChange={(e) => handleExperienceChange(card.id, "to", e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor={`current-${card.id}`} className="block text-sm font-medium text-gray-700">
                      Current
                    </label>
                    <input
                      id={`current-${card.id}`}
                      name={`current-${card.id}`}
                      type="checkbox"
                      className="mt-1"
                      checked={card.current}
                      onChange={(e) =>
                        handleExperienceChange(card.id, "current", e.target.checked)
                      }
                    />
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    onClick={() => removeExperienceCard(card.id)}
                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:shadow-lg transition duration-300"
                  >
                    Remove Experience
                  </button>
                </div>
              </div>
            ))}
            </div>

            {/* Education Section */}
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Education</h3>
        <button
          onClick={addEducationCard}
          className="text-blue-600 border border-blue-600 py-1 px-4 rounded-lg hover:bg-blue-100"
        >
          + Add
        </button>
      </div>
          
          {/* Render all Education Cards */}
      
      {/* Render all Education Cards */}
  {educationCards.map((card) => (
    <div
      key={card.id}
      className="border border-gray-300 bg-gray-50 rounded-lg p-6 mt-4"
    >
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Institution */}
        <div>
          <label
            htmlFor={`institution-${card.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Institution Name *
          </label>
          <input
            id={`institution-${card.id}`}
            name={`institution-${card.id}`}
            type="text"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={card.institution}
            onChange={(e) =>
              handleEducationChange(card.id, "institution", e.target.value)
            }
            required
          />
        </div>

        {/* Degree */}
        <div>
          <label
            htmlFor={`degree-${card.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Degree *
          </label>
          <input
            id={`degree-${card.id}`}
            name={`degree-${card.id}`}
            type="text"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={card.degree}
            onChange={(e) =>
              handleEducationChange(card.id, "degree", e.target.value)
            }
            required
          />
        </div>

        {/* Major */}
        <div>
          <label
            htmlFor={`major-${card.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Major *
          </label>
          <input
            id={`major-${card.id}`}
            name={`major-${card.id}`}
            type="text"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={card.major}
            onChange={(e) =>
              handleEducationChange(card.id, "major", e.target.value)
            }
            required
          />
        </div>

        {/* School Location */}
        <div>
          <label
            htmlFor={`schoolLocation-${card.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            School Location
          </label>
          <input
            id={`schoolLocation-${card.id}`}
            name={`schoolLocation-${card.id}`}
            type="text"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={card.schoolLocation}
            onChange={(e) =>
              handleEducationChange(card.id, "location", e.target.value)
            }
          />
        </div>

        {/* From and To Dates */}
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor={`from-${card.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              From *
            </label>
            <input
              id={`from-${card.id}`}
              name={`from-${card.id}`}
              type="date"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={card.from}
              onChange={(e) =>
                handleEducationChange(card.id, "from", e.target.value)
              }
              required
            />
          </div>
          <div>
            <label
              htmlFor={`to-${card.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              To *
            </label>
            <input
              id={`to-${card.id}`}
              name={`to-${card.id}`}
              type="date"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={card.to}
              onChange={(e) =>
                handleEducationChange(card.id, "to", e.target.value)
              }
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label
            htmlFor={`description-${card.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id={`description-${card.id}`}
            name={`description-${card.id}`}
            rows="4"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={card.description}
            onChange={(e) =>
              handleEducationChange(card.id, "description", e.target.value)
            }
          />
        </div>
      
      </form>

      {/* Remove Button */}
      <div className="mt-4">
        <button
          onClick={() => removeEducationCard(card.id)}
           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:shadow-lg transition duration-300"
        >
          Remove Education
        </button>
      </div>
    </div>
  ))}
      </div>
    
    {/* Profiles Section */}
    <div className="mt-10">
      <h3 className="text-lg font-semibold">Your Profiles</h3>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <input
          type="text"
          name="linkedIn"
          placeholder="LinkedIn Profile *REQUIRED"
          value={formData.linkedIn}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
          required
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub Profile *REQUIRED"
          value={formData.github}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
          required
        />
        <input
          type="text"
          name="twitter"
          placeholder="X (fka Twitter)"
          value={formData.twitter}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </form>
    </div>

    {/* Resume Section */}
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Resume *</h3>
      <div className="border-dashed border-2 border-gray-400 rounded-md p-4">
        <label
          htmlFor="file-upload"
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Select file, or drop file here *
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleResumeChange} 
          required
        />
        {resume && <p className="mt-2 text-gray-600">{resume.name}</p>}
      </div>
    </div>

     {/* Transcript Upload */}
     <div className="mt-6">
        <h3 className="text-lg font-semibold">Transcript Upload *</h3>
        <div className="border-dashed border-2 border-gray-400 rounded-md p-4">
          <label
            htmlFor="transcript-upload"
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Select file, or drop file here *
          </label>
          <input
            id="transcript-upload"
            type="file"
            className="hidden"
            onChange={handleTranscriptChange}
            required
          />
          {transcript && <p className="mt-2 text-gray-600">{transcript.name}</p>}
        </div>
      </div>


    {/* Message Section */}
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Message to the Hiring Team *</h3>
      <textarea
        placeholder="Let the company know about your interest in working there"
        rows="5"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="border border-gray-300 rounded-md p-2 w-full"
        required
      ></textarea>
    </div>



           

          <div className="flex justify-end mt-6">
            <button
              onClick={nextPage}
              className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800"
            >
              Next
            </button>
          </div>
        </>
      )}

      {currentPage === 2 && (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Preliminary Questions</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="rightToWork" className="block text-sm font-medium text-gray-700">
                Do you have the right to work in the country you are applying? *
              </label>
              <input
                type="text"
                id="rightToWork"
                name="rightToWork"
                value={formData.rightToWork}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="vacancySource" className="block text-sm font-medium text-gray-700">
                How did you hear about this vacancy? *
              </label>
              <input
                type="text"
                id="vacancySource"
                name="vacancySource"
                value={formData.vacancySource}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="employerChoice" className="block text-sm font-medium text-gray-700">
                What makes you choose this employer? *
              </label>
              <input
                type="text"
                id="employerChoice"
                name="employerChoice"
                value={formData.employerChoice}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="employerExpectations" className="block text-sm font-medium text-gray-700">
                What are your expectations from this employer? *
              </label>
              <input
                type="text"
                id="employerExpectations"
                name="employerExpectations"
                value={formData.employerExpectations}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>


            <div className="mb-4">
              <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">
                Preferred Salary Range? *
              </label>
              <input
                type="text"
                id="salaryRange"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="consent" className="block text-sm font-medium text-gray-700">
                I hereby give my consent for IFS to verify my background information.
              </label>
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="privacyPolicy" className="block text-sm font-medium text-gray-700">
                I agree to the Privacy Policy
              </label>
              <input
                type="checkbox"
                id="privacyPolicy"
                name="privacyPolicy"
                checked={formData.privacyPolicy}
                onChange={handleCheckboxChange}
                className="mr-2"
                required
              />
            </div>
          </form>
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={previousPage}
              className="text-purple-700 border border-purple-700 py-2 px-4 rounded-lg hover:bg-purple-100"
            >
              Previous
            </button>
            <button
               onClick={handleSubmit}
              className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800"
            >
              Submit
            </button>
          </div>
        </>
        
      )}
    </div>
    </>
  );
};

export default JobApplicationForm;



