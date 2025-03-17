import React, { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export const useJob = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <JobContext.Provider value={{ selectedJob, setSelectedJob }}>
            {children}
        </JobContext.Provider>
    );
};
