import { useEffect, useState } from "react";

const COUNTER_KEY = "benjamin_anoruo_portfolio_views";
const SESSION_KEY = "benjamin_portfolio_visited";

// Counts one view per browser session.
export function useViewCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let visited = false;
    try {
      visited = sessionStorage.getItem(SESSION_KEY) !== null;
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      visited = true;
    }
    fetch(`https://countapi.mileshilliard.com/api/v1/${visited ? "get" : "hit"}/${COUNTER_KEY}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.statusText))))
      .then((data) => {
        if (!cancelled && typeof data.value === "number") setCount(data.value);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return count;
}
