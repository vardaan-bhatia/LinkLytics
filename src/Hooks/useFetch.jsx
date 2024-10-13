import { useState } from "react";

const useFetch = (cb, options = {}) => {
  // Initializing state for data, loading, and error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // Function to perform the fetch operation
  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      // Call the provided callback function with options and arguments
      const response = await cb(options, ...args);
      setData(response); // Set the fetched data
    } catch (error) {
      setError(error); // Capture any error that occurs
    } finally {
      setLoading(false); // Set loading to false when fetch is complete
    }
  };

  // Return the state and fetch function
  return { data, loading, error, fn };
};

export default useFetch;
