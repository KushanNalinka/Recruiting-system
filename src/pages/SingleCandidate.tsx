// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";


// const CandidateProfile = () => {
//   const { id } = useParams();
//   const [candidate, setCandidate] = useState(null);

//   useEffect(() => {
//     console.log("Candidate ID:", id);
//     axios
//       .get(`http://localhost:5000/candidates/${id}`)
//       .then((response) => {
//         const data = response.data;
//         setCandidate({
//           ...data,
//           experience: typeof data.experience === "string" ? JSON.parse(data.experience) : data.experience,
//           education: typeof data.education === "string" ? JSON.parse(data.education) : data.education,
//         });
//       })
//       .catch((error) => console.error("Error fetching candidate details:", error));
//   }, [id]);

//   if (!candidate) return <div className="text-center text-white">Loading...</div>;

//   return (
//     <>
//       <PageMeta title="Candidate Profile" description="Detailed Candidate Information" />
//       <PageBreadcrumb pageTitle={`${candidate.firstName} ${candidate.lastName}`} />

//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4 text-center">
//           {candidate.firstName} {candidate.lastName}
//         </h1>
//         <p className="text-center text-[#DBD8E3] mb-6">{candidate.confirmEmail}</p>

//         <h2 className="text-2xl font-semibold text-[#DBD8E3] mb-3">Experience</h2>
//         {candidate.experience.length > 0 ? (
//           candidate.experience.map((exp, index) => (
//             <div key={index} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg">
//               <p><strong>Title:</strong> {exp.title}</p>
//               <p><strong>Company:</strong> {exp.company}</p>
//               <p><strong>From:</strong> {exp.from} - <strong>To:</strong> {exp.to}</p>
//               <p><strong>Location:</strong> {exp.officeLocation}</p>
//               <p><strong>Description:</strong> {exp.description}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-[#DBD8E3]">No experience available</p>
//         )}

//         <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Education</h2>
//         {candidate.education.length > 0 ? (
//           candidate.education.map((edu, index) => (
//             <div key={index} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg">
//               <p><strong>Institution:</strong> {edu.institute}</p>
//               <p><strong>Degree:</strong> {edu.degree}</p>
//               <p><strong>Year:</strong> {edu.year}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-[#DBD8E3]">No education available</p>
//         )}

//         {/* Display Charts (If Available) */}
//         <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Charts</h2>
//         {candidate.charts ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {Object.entries(candidate.charts).map(([category, data]) => (
//               <div key={category} className="bg-[#352F44] p-4 rounded-lg shadow-lg">
//                 <h3 className="text-lg font-semibold">{category}</h3>
//                 <img className="mt-2 rounded-lg border border-[#DBD8E3]" src={`data:image/png;base64,${data.chart}`} alt={`${category} Chart`} />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-[#DBD8E3]">No charts available</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default CandidateProfile;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const CandidateProfile = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    console.log("Fetching candidate details for ID:", id);

    if (!id) {
      console.error("Candidate ID is undefined. Cannot fetch data.");
      return;
    }

    axios
      .get(`http://localhost:5000/candidates/${id}`)
      .then((response) => {
        const data = response.data;
        setCandidate({
          ...data,
          experience: typeof data.experience === "string" ? JSON.parse(data.experience) : data.experience,
          education: typeof data.education === "string" ? JSON.parse(data.education) : data.education,
        });
      })
      .catch((error) => console.error("Error fetching candidate details:", error));
  }, [id]);

  if (!candidate) return <div className="text-center text-white">Loading...</div>;

  return (
    <>
      <PageMeta title="Candidate Profile" description="Detailed Candidate Information" />
      <PageBreadcrumb pageTitle={`${candidate.firstName} ${candidate.lastName}`} />

      <div className="p-6 bg-[#2A2438] text-white min-h-screen">
         {/* 🔹 Basic Candidate Info */}
         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4 text-center">
          {candidate.firstName} {candidate.lastName}
        </h1>
        <p className="text-center text-[#DBD8E3] mb-6">{candidate.confirmEmail}</p>

        {/* 🔹 Job Details */}
        <h2 className="text-xl font-semibold text-[#DBD8E3] mb-3">Job Position</h2>
        <p className="text-[#DBD8E3]">{candidate.jobPosition} - {candidate.jobTitle}</p>

        {/* 🔹 Additional Information (Styled) */}
        <div className="bg-[#352F44] p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-bold text-[#DBD8E3] mb-4">Additional Information</h2>
          <p className="text-[#DBD8E3]"><strong>LinkedIn : </strong>  <a href={candidate.linkedIn} className="text-blue-400 underline">{candidate.linkedIn}</a></p>
          <p className="text-[#DBD8E3]"><strong>GitHub : </strong>  <a href={candidate.github} className="text-blue-400 underline">{candidate.github}</a></p>
          <p className="text-[#DBD8E3]"><strong>Twitter : </strong> <a href={candidate.twitter} className="text-blue-400 underline">{candidate.twitter}</a></p>
          <p className="text-[#DBD8E3]"><strong>Website : </strong> <a href={candidate.website} className="text-blue-400 underline">{candidate.website}</a></p>
          <p className="text-[#DBD8E3]"><strong>University : </strong> <span className="text-green-400">{candidate.university} </span></p>
          <p className="text-[#DBD8E3]"><strong>Education Level : </strong> <span className="text-green-400">{candidate.education_level} </span></p>
        
         
        </div>

        {/* 🔹 Matching Scores (Styled) */}
        <div className="bg-[#5C5470] p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-bold text-[#DBD8E3] mb-4">Candidate Insights for Job</h2>
          <p className="text-[#DBD8E3]"><strong>Prefered Salary Range : </strong> <span className="text-green-400"> {candidate.salaryRange}</span></p>
          <p className="text-[#DBD8E3]"><strong>Vacancy Source : </strong> <span className="text-green-400">{candidate.vacancySource}</span></p>
          <p className="text-[#DBD8E3]"><strong>No of yeras of Experience:</strong> <span className="text-green-400">{candidate.noofyearsofexperience}</span> </p>
          <p className="text-[#DBD8E3]"><strong>Policy State:</strong> <span className="text-green-400">{candidate.privacyPolicy}</span></p>
          <p className="text-[#DBD8E3]"><strong>Message To Hiring Manager:</strong><span className="text-green-400"> {candidate.message}</span></p>
          <p className="text-[#DBD8E3]"><strong>Employer Choice:</strong><span className="text-green-400"> {candidate.employerChoice}</span></p>
          <p className="text-[#DBD8E3]"><strong>Employer Expectations:</strong> <span className="text-green-400">{candidate.employerExpectations}</span></p>
         </div>

        {/* 🔹 Matching Scores (Styled) */}
        <div className="bg-[#5C5470] p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-bold text-[#DBD8E3] mb-4">Matching Scores</h2>
          <p className="text-[#DBD8E3]"><strong>Predicted Matching Percentage : </strong> <span className="text-green-400">{candidate.predicted_matching_percentage}%</span></p>
          <p className="text-[#DBD8E3]"><strong>Work Experience Matching : </strong> <span className="text-green-400">{candidate.workExperienceMatchingSimilarity}%</span></p>
          <p className="text-[#DBD8E3]"><strong>Achievements Similarity : </strong> <span className="text-green-400">{candidate.achievements_similarity}%</span></p>
          <p className="text-[#DBD8E3]"><strong>Courses & Certifications Similarity : </strong> <span className="text-green-400">{candidate.coursesAndCertificationMatchingSimilarity}%</span></p>
          <p className="text-[#DBD8E3]"><strong>Projects Matching Similarity : </strong> <span className="text-green-400">{candidate.projectsMatchingSimilarity}%</span></p>
        </div>

        {/* 🔹 Experience Section */}
        <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Experience</h2>
        {candidate.experience.length > 0 ? (
          candidate.experience.map((exp, index) => (
            <div key={index} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg">
              <p><strong>Title:</strong> {exp.title}</p>
              <p><strong>Company:</strong> {exp.company}</p>
              <p><strong>From:</strong> {exp.from} - <strong>To:</strong> {exp.to}</p>
              <p><strong>Location:</strong> {exp.officeLocation}</p>
              <p><strong>Description:</strong> {exp.description}</p>
            </div>
          ))
        ) : (
          <p className="text-[#DBD8E3]">No experience available</p>
        )}

        {/* 🔹 Education Section */}
        <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Education</h2>
        {candidate.education.length > 0 ? (
          candidate.education.map((edu, index) => (
            <div key={index} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg">
              <p><strong>Institution:</strong> {edu.institute}</p>
              <p><strong>Degree:</strong> {edu.degree}</p>
              <p><strong>Year:</strong> {edu.year}</p>
            </div>
          ))
        ) : (
          <p className="text-[#DBD8E3]">No education available</p>
        )}

        {/* 🔹 Charts Section */}
        <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Charts</h2>
        {candidate.charts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(candidate.charts).map(([category, data]) => (
              <div key={category} className="bg-[#352F44] p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold">{category}</h3>
                <img className="mt-2 rounded-lg border border-[#DBD8E3]" src={`data:image/png;base64,${data.chart}`} alt={`${category} Chart`} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#DBD8E3]">No charts available</p>
        )}

        {/* 🔹 Skills & Technologies (Styled) */}
        <div className="bg-[#352F44] p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-bold text-[#DBD8E3] mb-4">Skills & Technologies</h2>
          <p className="text-[#DBD8E3]"><strong>Programming Languages : </strong> <span className="text-green-400">{candidate.extractednoofprogramminglanguages}</span></p>
          <p className="text-[#DBD8E3]"><strong>Frameworks : </strong> <span className="text-green-400">{candidate.extractednoofprogrammingframeworks}</span></p>
          <p className="text-[#DBD8E3]"><strong>Cloud Technologies : </strong> <span className="text-green-400">{candidate.extractednoofcloudtechnologies}</span></p>
          <p className="text-[#DBD8E3]"><strong>Databases : </strong> <span className="text-green-400">{candidate.extractednoofdatabasetechnologies}</span></p>
          <p className="text-[#DBD8E3]"><strong>DevOps Tools : </strong> <span className="text-green-400">{candidate.extractednoofdevopstools}</span></p>
          <p className="text-[#DBD8E3]"><strong>Software Development Methodologies : </strong> <span className="text-green-400">{candidate.extractednoofsoftwaredevelopmentmethodologies}</span></p>
          <p className="text-[#DBD8E3]"><strong>Version Controlling : </strong> <span className="text-green-400">{candidate.extractednoofversioncontroltechnologies}</span></p>
          <p className="text-[#DBD8E3]"><strong>Web Development Technologies : </strong> <span className="text-green-400">{candidate.extractednoofwebtechnologies}</span></p>
          <p className="text-[#DBD8E3]"><strong>Total Number of Tools & Technologies : </strong> <span className="text-green-400">{candidate.num_of_tools_technologies}</span></p>
        </div>

        {/* 🔹 Project Experience */}
        <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Project Experience</h2>
        {candidate.project_experiences && candidate.project_experiences.length > 0 ? (
          candidate.project_experiences.map((proj, index) => (
            <div key={index} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg">
              <p>{proj}</p>
            </div>
          ))
        ) : (
          <p className="text-[#DBD8E3]">No project experiences available</p>
        )}

        {/* 🔹 Work Experience Section */}
        <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Work Experience</h2>
        {candidate.work_experience.length > 0 ? (
          candidate.work_experience.map((work, index) => (
            <div key={index} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg">
              <p><strong>Project / Work Title:</strong> {work}</p>
            </div>
          ))
        ) : (
          <p className="text-[#DBD8E3]">No work experience details available</p>
        )}

        {/* 🔹 Certifications & Courses */}
        <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Courses & Certifications</h2>
        {candidate.courses_certifications_achievements.length > 0 ? (
          candidate.courses_certifications_achievements.map((cert, index) => (
            <div key={index} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg">
              <p><strong>Certification:</strong> {cert.title}</p>
              <p><strong>Platform:</strong> {cert.platform}</p>
            </div>
          ))
        ) : (
          <p className="text-[#DBD8E3]">No certifications available</p>
        )}


        {/* 🔹 Documents */}
        <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Documents</h2>
        <p className="text-[#DBD8E3]"><strong>Resume:</strong> <a href={`http://localhost:5000/uploads/cv/${candidate.resume}`} className="text-blue-400 underline">Download Resume</a></p>
        <p className="text-[#DBD8E3]"><strong>Transcript:</strong> <a href={`http://localhost:5000/uploads/transcripts/${candidate.transcript}`} className="text-blue-400 underline">Download Transcript</a></p>

      </div>
    </>
  );
};

export default CandidateProfile;
