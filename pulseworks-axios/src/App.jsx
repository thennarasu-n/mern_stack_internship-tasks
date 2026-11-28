import React from "react";
import { useCallback, useEffect, useState } from "react";
import { fetchTasks } from "./api.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async (signal) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchTasks(signal);
      setTasks(data);
    } catch (requestError) {
      if (requestError.code !== "ERR_CANCELED") {
        setError("We couldn't load tasks right now. Check your connection and try again.");
      }
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadTasks(controller.signal);
    return () => controller.abort();
  }, [loadTasks]);

  function retry() {
    const controller = new AbortController();
    loadTasks(controller.signal);
  }

  return (
    <main className="shell">
      <header className="header"><a className="brand" href="/" aria-label="PulseWorks home"><span>P</span> pulseworks</a><span>API INTEGRATION / TASKS</span></header>
      <section className="intro">
        <p className="eyebrow">YOUR WORKSPACE</p>
        <h1>Tasks, at a glance.</h1>
        <p>Task data is loaded from a mock REST API with Axios.</p>
        <button className="refresh" type="button" onClick={retry} disabled={loading}>{loading ? "Loading…" : "Refresh tasks"}</button>
      </section>
      <section className="task-list" aria-live="polite">
        {loading && <div className="state-card"><span className="spinner" /> Loading tasks…</div>}
        {!loading && error && <div className="state-card error"><p>{error}</p><button className="refresh" onClick={retry}>Try again</button></div>}
        {!loading && !error && tasks.length === 0 && <div className="state-card">No tasks returned by the API.</div>}
        {!loading && !error && tasks.map((task) => (
          <article className="task" key={task.id}>
            <span className={task.completed ? "check completed" : "check"} aria-label={task.completed ? "Completed" : "Pending"}>{task.completed ? "✓" : ""}</span>
            <div><h2>{task.title}</h2><p>Task #{task.id} · {task.completed ? "Completed" : "Pending"}</p></div>
            <span className={task.completed ? "status done" : "status"}>{task.completed ? "DONE" : "OPEN"}</span>
          </article>
        ))}
      </section>
      <footer>JSONPlaceholder mock API · Data refreshes on demand</footer>
    </main>
  );
}

export default App;
