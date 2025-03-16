const LinkedInDataCard = ({ profileData }: any) => {
  if (!profileData) return null;

  const {
    firstName,
    lastName,
    summary,
    projects,
    headline,
    geo,
    backgroundImage,
    profilePicture,
    position,
    educations,
  } = profileData;

  // // Background Image URL (from profile)
  const backgroundImageNew = backgroundImage ? backgroundImage[0].url : "";

  // Profile Picture (from profile)

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Background Image */}
      <div className="relative z-10 mb-2">
        <img
          src={backgroundImageNew}
          alt="Background"
          className="w-full h-48 object-cover opacity-90"
        />
        <div className="absolute top-0 left-0 w-full h-48 bg-black opacity-25"></div>
      </div>

      {/* Profile Section */}
      <div className="flex justify-center items-center -mt-1 z-20">
        <img
          src={profilePicture}
          alt={`${firstName} ${lastName}`}
          className="w-32 h-32 rounded-full border-4 border-white"
        />
      </div>

      <div className="text-center p-4">
        <h2 className="text-2xl font-semibold text-gray-800">{`${firstName} ${lastName}`}</h2>
        <p className="text-gray-500">{headline}</p>
        <p className="text-sm text-gray-400">{geo?.full}</p>
      </div>

      {/* About Section */}
      {summary && (
        <div className="p-4">
          <h3 className="font-semibold text-gray-800">About</h3>
          <p className="text-gray-600">{summary}</p>
        </div>
      )}

      {/* Current Company */}
      {position && position.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800">Current Position</h3>
          {position.map((job, index) => (
            <div key={index} className="mt-2">
              <h4 className="text-gray-700 font-semibold">{job.title}</h4>
              <p className="text-gray-600">{job.companyName}</p>
              <p className="text-gray-500">{job.location}</p>
              <a
                href={job.companyURL}
                className="text-blue-500 hover:underline mt-2 block"
              >
                Company LinkedIn
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {educations && educations.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800">Education</h3>
          {educations.map((education, index) => (
            <div key={index} className="mt-2">
              <h4 className="text-gray-700 font-semibold">
                {education.degree} in {education.fieldOfStudy}
              </h4>
              <p className="text-gray-600">{education.schoolName}</p>
              <p className="text-gray-500">
                {new Date(
                  education.start.year,
                  education.start.month - 1
                ).toLocaleDateString()}{" "}
                -{" "}
                {new Date(
                  education.end.year,
                  education.end.month - 1
                ).toLocaleDateString()}
              </p>
              <a
                href={education.url}
                className="text-blue-500 hover:underline mt-2 block"
              >
                School LinkedIn
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Projects Section (if available) */}

      {projects && projects.items && projects.items.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800">Projects</h3>
          {projects.items.map((project, index) => (
            <div key={index} className="mt-2">
              <h4 className="text-gray-700 font-semibold">{project.title}</h4>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkedInDataCard;
