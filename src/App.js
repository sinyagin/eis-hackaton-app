import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('Tell me about CSAA optimization project');
  const [prompt, setPrompt] = useState('You are a question answering agent');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

    const invokeLambda = async () => {
    try {
        setLoading(true);
        setResponse('')
      const apiUrl = "https://f9kgzmm9ig.execute-api.us-west-2.amazonaws.com/prod/talk";

      const payload = {
        question: input,
        prompt: prompt
      };

      const result = await axios.post(apiUrl, payload);
      setResponse(result.data);
    } catch (error) {
      console.error("Error invoking Lambda:", error);
      setResponse("Something went wrong. Check the console for details.");
    } finally {
        setLoading(false); // Re-enable the button after the request is finished
    }
  };

  return (
      <div style={{textAlign: "center", padding: "20px"}}>
          <h1>Ask the EIS Smartypants Surveyor</h1>
          <div style={{margin: "10px"}}>
              <input
                  type="text"
                  placeholder="Ask a question"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{padding: "10px", width: "300px"}}
              />
          </div>
          <div style={{margin: "10px"}}>
              <input
                  type="text"
                  placeholder="Optional prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  style={{padding: "10px", width: "300px"}}
              />
          </div>
          <button
              onClick={invokeLambda}
              disabled={loading} // Disable the button when loading is true
              style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  margin: "20px",
                  cursor: loading ? "not-allowed" : "pointer", // Style changes when disabled
                  backgroundColor: loading ? "#ccc" : "#007bff", // Grey out when loading
                  color: loading ? "#666" : "#fff" // Change text color when loading
              }}
          >
              {loading ? "Loading..." : "Get Answer"} {/* Update button text for clarity */}
          </button>
    <div>
        <h3>Response:</h3>
        <p style={{background: "#f5f5f5", padding: "10px", borderRadius: "5px"}}>
            {response}
        </p>
    </div>
</div>
)
    ;
}

export default App;
