import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UserSummaryTable = ({ userData, selectedCandidate }: any) => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ref = useRef(null);

  const navigateTo = useNavigate();

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setApiResponse(null);

    const apiUrl = "http://127.0.0.1:5001/predict";
    const requestBody = {
      //@ts-ignore
      marks: ref.current.value,
      features: [
        userData.totalCommits,
        userData.maxStreak,
        userData.commitFrequency,
        userData.commitConsistency,
        userData.averageWeeklyCommits,
        userData.activeDays,
        userData.daysWithoutCommits,
      ],
    };

    console.log("Request body", requestBody);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      setApiResponse(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveResultsToDB = async () => {
    //@ts-ignore
    if (!selectedCandidate?._id || !apiResponse?.marks) {
      toast.error("Candidate ID or marks not available!");
      return;
    }

    const candidateId = selectedCandidate._id;

    try {
      const response = await axios.put(
        `http://127.0.0.1:5001/api/candidates/${candidateId}/github`,
        //@ts-ignore
        { githubMark: apiResponse.marks },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success("Marks successfully saved to DB!");
      } else {
        toast.error("Failed to save marks.");
      }
    } catch (error) {
      console.error("Error saving marks:", error);
      toast.error("Error occurred while saving.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "90%",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
        overflowX: "auto", // Enables horizontal scrolling for smaller screens
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "20px",
          color: "#004080",
        }}
      >
        User Summary and Prediction
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              User Name
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              Total Commits
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              Max Streak
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              Average Weekly Commits
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              Current Streak
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              Commit Frequency
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              Commit Consistency (Strike Rate)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {userData.userName}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {userData.totalCommits}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {userData.maxStreak}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {userData.averageWeeklyCommits.toFixed(2)}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {userData.currentStreak}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {(userData.commitFrequency * 100).toFixed(2)}%
            </td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {(userData.commitConsistency * 100).toFixed(2)}%
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "120px" }}>
        Enter the proportion for GitHub user analyse
        <form style={{ marginTop: "12px" }}>
          <input ref={ref} type="text" placeholder="marks" />
        </form>
      </div>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#004080",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s ease",
        }}
        onClick={handlePredict}
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {apiResponse && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            {/*@ts-ignore*/}
            Marks: {apiResponse.marks}
          </p>
          {/* <p style={{ fontSize: "1rem" }}>
            Prediction: {apiResponse.prediction}
          </p> */}
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#ffe6e6",
            color: "#cc0000",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ fontSize: "1rem" }}>Error: {error}</p>
        </div>
      )}

      <br />
      <br />
      <button onClick={saveResultsToDB} style={{ marginRight: 10 }}>
        Save The results to DB
      </button>
      <button onClick={() => navigateTo("/")}>Go to Home</button>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default UserSummaryTable;
