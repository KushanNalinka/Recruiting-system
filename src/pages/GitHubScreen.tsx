import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ContributionChart from "../components/gitHub/ContributionChart";
import UserSummaryTable from "../components/gitHub/UserSummaryTable";
import { retrieveContributionData } from "../services/githubService";
import calculateContributionMetrics from "../components/gitHub/calculateContributionMetrics";

const FinalCandidate = () => {
  const { id } = useParams(); // Get Candidate ID from URL
  const [predictedPercentage, setPredictedPercentage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("yasas4d");
  const [totalContributions, setTotalContributions] = useState(0);
  const [metrics, setMetrics] = useState(null);
  const [contributionDays, setContributionDays] = useState([]);

  const location = useLocation();
  const selectedCandidate = location.state.candidate;
  const githubUsername = selectedCandidate?.github?.replace(
    "https://github.com/",
    ""
  );

  useEffect(() => {
    if (githubUsername) {
      fetchContributionData(githubUsername);
    }
  }, [githubUsername]);

  const fetchContributionData = async (username: any) => {
    const { userName, weeks } = await retrieveContributionData(username);
    const calculatedMetrics = calculateContributionMetrics(weeks, userName);
    const contributionDays = weeks.flatMap(
      (week: any) => week.contributionDays
    );

    //@ts-ignore
    setTotalContributions(calculatedMetrics.totalContributions);
    setContributionDays(contributionDays);
    //@ts-ignore
    setMetrics(calculatedMetrics);
  };

  return (
    <>
      <PageMeta
        title="Finalized Candidate"
        description="Final Matching Percentage and GitHub Insights"
      />
      <PageBreadcrumb pageTitle="Finalized Candidate" />

      <div className="p-6 bg-[#2A2438]  min-h-screen flex flex-col items-center">
        {/* <h1 className="text-3xl font-bold text-[#DBD8E3] mb-6">
          Finalized Candidate Report
        </h1> */}

        {/* {loading ? (
          <p className="text-lg text-[#DBD8E3]">Loading...</p>
        ) : error ? (
          <p className="text-red-400 text-lg">{error}</p>
        ) : (
          <div className="bg-[#352F44] p-6 rounded-lg shadow-lg text-center w-1/2">
            <h2 className="text-2xl font-semibold text-[#DBD8E3]">
              Candidate ID: {id}
            </h2>
            <p className="text-xl font-semibold text-[#DBD8E3] mt-4">
              Predicted Matching Percentage
            </p>
            <div className="mt-4 text-4xl font-bold text-[#4CAF50]">
              {predictedPercentage ? `${predictedPercentage}%` : "N/A"}
            </div>
          </div>
        )} */}

        {githubUsername && (
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-bold text-[#DBD8E3] mb-4">
              GitHub Contributions Analysis
            </h2>
            <h3 className="text-lg text-[#DBD8E3]">
              Contributions of{" "}
              <a
                href={selectedCandidate.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {githubUsername}
              </a>
            </h3>
            <ContributionChart contributionDays={contributionDays} />

            <div className="mt-6">
              <h2 className="text-xl font-bold text-[#DBD8E3]">
                GitHub Contribution Summary
              </h2>
              {metrics ? (
                <UserSummaryTable
                  userData={metrics}
                  selectedCandidate={selectedCandidate}
                />
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FinalCandidate;
