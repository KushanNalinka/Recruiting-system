import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";


const CandidateProfile = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    console.log("Candidate ID:", id);
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
        <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4 text-center">
          {candidate.firstName} {candidate.lastName}
        </h1>
        <p className="text-center text-[#DBD8E3] mb-6">{candidate.confirmEmail}</p>

        <h2 className="text-2xl font-semibold text-[#DBD8E3] mb-3">Experience</h2>
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

        {/* Display Charts (If Available) */}
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
      </div>
    </>
  );
};

export default CandidateProfile;
