import React from "react";
import { Link, NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";

const pageLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/tasks", label: "Tasks" },
  { to: "/team", label: "Team" },
  { to: "/projects", label: "Projects" },
];

function Navigation() {
  const location = useLocation();

  return (
    <header className="topbar">
      <Link to="/" className="brand" aria-label="PulseWorks home"><span className="brand-icon">P</span> pulseworks</Link>
      <nav aria-label="Main navigation">
        {pageLinks.map(({ to, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{label}</NavLink>
        ))}
      </nav>
      <Link className="new-task" to="/tasks/new">+ New task</Link>
      <span className="route-label" aria-live="polite">{location.pathname}</span>
    </header>
  );
}

function Page({ eyebrow, title, description, children }) {
  return (
    <main className="page">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="description">{description}</p>
      {children}
    </main>
  );
}

function Landing() {
  return (
    <Page eyebrow="WORK, IN GOOD ORDER" title="Make room for good work." description="A clear home for your team's priorities, projects, and people.">
      <div className="hero-actions"><Link to="/dashboard" className="button">Open workspace</Link><Link to="/login" className="button secondary">Log in</Link></div>
    </Page>
  );
}

function Dashboard() {
  return (
    <Page eyebrow="MONDAY, MAY 12" title="Good morning, Jamie." description="Here is the latest across your workspace.">
      <div className="cards"><article><strong>0</strong><span>Open tasks</span></article><article><strong>0</strong><span>In progress</span></article><article><strong>0</strong><span>Completed</span></article></div>
      <Link to="/tasks/new" className="button">Create a task</Link>
    </Page>
  );
}

function Tasks() {
  return (
    <Page eyebrow="WORKSPACE" title="Tasks" description="Keep the next steps visible and moving.">
      <div className="task-row"><span>No tasks yet</span><span>Create your first task to get started.</span></div>
      <Link to="/tasks/new" className="button">Create a task</Link>
    </Page>
  );
}

function CreateTask() {
  return <Page eyebrow="TASKS / NEW" title="Create a task" description="Add a task to your workspace."><form className="simple-form" onSubmit={(event) => { event.preventDefault(); window.alert("Task saved."); }}><label>Task title<input required minLength="3" placeholder="e.g. Prepare launch notes" /></label><label>Assigned to<select required defaultValue=""><option value="" disabled>Select an employee</option><option>Employee 01</option><option>Employee 02</option></select></label><button className="button">Create task</button></form></Page>;
}

function Team() {
  return <Page eyebrow="WORKSPACE" title="Your team" description="People will appear here when you add them."><div className="task-row"><span>No team members yet</span></div></Page>;
}

function Projects() {
  return <Page eyebrow="WORKSPACE" title="Projects" description="Your projects will appear here when you add them."><div className="task-row"><span>No projects yet</span></div></Page>;
}

function AuthPage({ register = false }) {
  return <Page eyebrow="PULSEWORKS WORKSPACE" title={register ? "Create your account" : "Welcome back"} description={register ? "Set up your workspace to get started." : "Sign in to pick up where you left off."}><form className="simple-form" onSubmit={(event) => { event.preventDefault(); window.alert("Connect your authentication provider to continue."); }}>{register && <label>Name<input required autoComplete="name" /></label>}<label>Email address<input type="email" required autoComplete="email" /></label><label>Password<input type="password" required minLength="8" autoComplete={register ? "new-password" : "current-password"} /></label><button className="button">{register ? "Create account" : "Log in"}</button></form></Page>;
}

function NotFound() {
  return <Page eyebrow="404" title="Page not found" description="That route is not part of this workspace."><Link to="/" className="button">Return home</Link></Page>;
}

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/new" element={<CreateTask />} />
        <Route path="/team" element={<Team />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/overview" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
