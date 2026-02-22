"use client";
import { useEffect, useState } from "react";

export default function TestAuth() {
  const [token, setToken] = useState("");
  const [testResult, setTestResult] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("session-token");
    setToken(stored || "No token found");
  }, []);

  const testAPI = async () => {
    try {
      const response = await fetch("http://localhost/Jacom-Platform/backend/subscribers", {
        headers: {
          "X-Session-Token": localStorage.getItem("session-token") || ""
        }
      });
      const data = await response.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setTestResult("Error: " + err.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Test</h1>
      <div className="space-y-4">
        <div>
          <strong>Token in localStorage:</strong>
          <pre className="bg-gray-100 p-2 mt-2">{token}</pre>
        </div>
        <button onClick={testAPI} className="bg-primary text-white px-4 py-2 rounded">
          Test Subscribers API
        </button>
        {testResult && (
          <div>
            <strong>API Response:</strong>
            <pre className="bg-gray-100 p-2 mt-2">{testResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
