import {useEffect, useState} from "react";


function useStats(url) {
  const [stats, setStats] = useState();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {

      setError(false);
      setLoading(true);



      const data = await fetch(url, {signal: signal}).then(res => {
        if (res.status === 200) {
          setLoading(false);
          return res.json();
        } else {
          setError(true);
          setLoading(false);
        }

      });

      setStats(data);



    }

    //setLoading(false);
    fetchData();

    return function cleanup() {
      abortController.abort();
    }

  }, [url]);
  return {
    stats,
    loading,
    error
  };
}

export default useStats;
