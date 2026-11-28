import React from "react";
import { createContext, useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { employees, priorities, taskSchema, taskStatuses } from "./taskSchema.js";

const TaskContext = createContext(null);

function Logo() {
  return (
    <Link to="/" className="brand" aria-label="Fastline home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 42 32" role="img">
          <path d="M3 10h7M1 16h8M4 22h6" />
          <path d="M13 21l3-7h14l4 3h6v7H13z" />
          <path d="M19 14l3-5h7l4 5M16 19h21" />
          <circle cx="20" cy="24" r="2" /><circle cx="34" cy="24" r="2" />
        </svg>
      </span>
      <span>FASTLINE</span>
    </Link>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <Logo />
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>Overview</NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? "active" : ""}>Tasks</NavLink>
        <NavLink to="/projects" className={({ isActive }) => isActive ? "active" : ""}>Projects</NavLink>
        <NavLink to="/team" className={({ isActive }) => isActive ? "active" : ""}>Team</NavLink>
      </nav>
      <Link to="/tasks/new" className="header-action">New task <span aria-hidden="true">+</span></Link>
    </header>
  );
}

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function LandingPage() {
  return (
    <main>
      <section className="landing-hero">
        <div className="hero-copy">
          <p className="eyebrow">BUILT FOR SPEED. DRIVEN BY YOUR TEAM.</p>
          <h1>Work fast.<br />Stay in control.</h1>
          <p className="hero-description">A sharp, no-nonsense workspace for the people and projects that keep your business moving.</p>
          <div className="hero-actions">
            <Link to="/register" className="button button-dark">Create your workspace <span aria-hidden="true">&rarr;</span></Link>
            <Link to="/login" className="button button-light">Sign in</Link>
          </div>
          <div className="hero-note"><span className="note-line" /> Your next move starts here.</div>
        </div>
        <div className="hero-board" aria-label="Fastline workspace preview">
          <div className="board-top"><span className="board-label">MONDAY / TEAM OVERVIEW</span><span className="board-date">MAY 12</span></div>
          <div className="board-title"><div><span className="eyebrow">YOUR WORKSPACE</span><h2>Clear road ahead.</h2></div><span className="board-count">00<br /><small>OPEN TASKS</small></span></div>
          <div className="empty-board">
            <span className="start-line" aria-hidden="true" />
            <strong>Nothing on the board yet.</strong>
            <p>Create your first task and get moving.</p>
            <Link to="/tasks/new" className="board-footer">Add the first task <span aria-hidden="true">&nearr;</span></Link>
          </div>
        </div>
      </section>
      <section className="landing-proof">
        <span>PLAN THE MOVE.</span><span>OWN THE WORK.</span><span>FINISH STRONG.</span>
      </section>
      <section className="landing-bottom">
        <div><p className="eyebrow">BUILT FOR THE LONG RUN</p><h2>Keep every move on track.</h2></div>
        <p>Set priorities, bring the right people together, and keep the important work moving without the noise.</p>
      </section>
    </main>
  );
}

function AuthPage({ isRegister = false }) {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/dashboard");
  }

  return (
    <main className="auth-page">
      <p className="eyebrow">FASTLINE WORKSPACE</p>
      <h1>{isRegister ? "Create your account" : "Welcome back"}</h1>
      <p className="section-description">{isRegister ? "Start making room for the work that matters." : "Sign in to pick up where you left off."}</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        {isRegister && <label>Full name<input type="text" name="name" autoComplete="name" required /></label>}
        <label>Email address<input type="email" name="email" autoComplete="email" required /></label>
        <label>Password<input type="password" name="password" autoComplete={isRegister ? "new-password" : "current-password"} minLength="8" required /></label>
        <button className="button button-dark" type="submit">{isRegister ? "Create account" : "Sign in"}</button>
      </form>
      <p className="auth-switch">{isRegister ? "Already have an account?" : "New to Fastline?"} <Link to={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create an account"}</Link></p>
    </main>
  );
}

function TaskRows() {
  const { tasks: createdTasks } = useContext(TaskContext);
  if (createdTasks.length === 0) {
    return <div className="empty-state"><strong>Nothing on the board yet.</strong><span>Add a task to get your workspace moving.</span><Link to="/tasks/new" className="text-link">Create your first task &rarr;</Link></div>;
  }

  return (
    <div className="task-table">
      {createdTasks.map((task) => (
        <article className="task-row" key={task.id}>
          <span className="task-marker active-marker" />
          <div className="task-name"><strong>{task.title}</strong><small>{task.description}</small></div>
          <span className="task-owner">{task.assignee}</span>
          <span className="task-date">{task.dueDate}</span>
          <span className="task-status">{task.status}</span>
        </article>
      ))}
    </div>
  );
}

function DashboardPage() {
  const { tasks } = useContext(TaskContext);
  const inProgressCount = tasks.filter((task) => task.status === "In Progress").length;
  const completedCount = tasks.filter((task) => task.status === "Completed").length;

  return (
    <main className="workspace-page">
      <SectionHeading eyebrow="YOUR WORKSPACE" title="Good morning, Arasu." description="A clear view of what's moving with your team."
        action={<Link to="/tasks/new" className="button button-dark">+ Create task</Link>} />
      <div className="stat-grid"><article><span>TOTAL TASKS</span><strong>{tasks.length}</strong><small>Across your workspace</small></article><article><span>IN PROGRESS</span><strong>{inProgressCount}</strong><small>Moving forward today</small></article><article><span>COMPLETED</span><strong>{completedCount}</strong><small>Finished tasks</small></article></div>
      <section className="content-card">
        <div className="card-heading"><div><p className="eyebrow">YOUR WORKSPACE</p><h2>Current tasks</h2></div><Link to="/tasks" className="text-link">View all tasks &rarr;</Link></div>
        <TaskRows />
      </section>
    </main>
  );
}

function TasksPage() {
  const { tasks: createdTasks } = useContext(TaskContext);

  return (
    <main className="workspace-page">
      <SectionHeading eyebrow="WORKSPACE / TASKS" title="All tasks" description="Keep the next steps visible and moving."
        action={<Link to="/tasks/new" className="button button-dark">+ Create task</Link>} />
      <section className="content-card">
        <div className="card-heading"><div><p className="eyebrow">TASK BOARD</p><h2>Tasks in your workspace</h2></div><span className="quiet-count">{createdTasks.length} items</span></div>
        <TaskRows />
      </section>
    </main>
  );
}

function FieldError({ id, children }) {
  return children ? <span id={id} className="field-error" role="alert">{children}</span> : null;
}

function CreateTaskPage() {
  const navigate = useNavigate();
  const setCreatedTasks = useContext(TaskContext).addTask;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "", description: "", assignee: "", priority: "", dueDate: "", status: "" },
  });

  function onSubmit(data) {
    console.log("New task:", data);
    setCreatedTasks({ ...data, id: `local-${Date.now()}` });
    navigate("/tasks");
  }

  return (
    <main className="workspace-page">
      <SectionHeading eyebrow="TASKS / NEW TASK" title="Create a new task" description="Give the team a clear next step." />
      <form className="create-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <section className="form-section">
          <div className="card-heading"><div><p className="eyebrow">01 / DETAILS</p><h2>What needs to get done?</h2></div></div>
          <div className="form-field">
            <label htmlFor="title">Task title <span>*</span></label>
            <input id="title" placeholder="e.g. Finalize homepage wireframes" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "title-error" : undefined} {...register("title")} />
            <FieldError id="title-error">{errors.title?.message}</FieldError>
          </div>
          <div className="form-field">
            <label htmlFor="description">Description <span>*</span></label>
            <textarea id="description" rows="4" placeholder="Add helpful context for the person taking this on..." aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : undefined} {...register("description")} />
            <FieldError id="description-error">{errors.description?.message}</FieldError>
          </div>
        </section>
        <section className="form-section">
          <div className="card-heading"><div><p className="eyebrow">02 / PLANNING</p><h2>Owner and timing</h2></div></div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="assignee">Assigned employee <span>*</span></label>
              <select id="assignee" aria-invalid={Boolean(errors.assignee)} aria-describedby={errors.assignee ? "assignee-error" : undefined} {...register("assignee")}>
                <option value="">Select a teammate</option>{employees.map((employee) => <option key={employee} value={employee}>{employee}</option>)}
              </select>
              <FieldError id="assignee-error">{errors.assignee?.message}</FieldError>
            </div>
            <div className="form-field">
              <label htmlFor="priority">Priority <span>*</span></label>
              <select id="priority" aria-invalid={Boolean(errors.priority)} aria-describedby={errors.priority ? "priority-error" : undefined} {...register("priority")}>
                <option value="">Select priority</option>{priorities.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
              </select>
              <FieldError id="priority-error">{errors.priority?.message}</FieldError>
            </div>
            <div className="form-field">
              <label htmlFor="dueDate">Due date <span>*</span></label>
              <input id="dueDate" type="date" aria-invalid={Boolean(errors.dueDate)} aria-describedby={errors.dueDate ? "due-date-error" : undefined} {...register("dueDate")} />
              <FieldError id="due-date-error">{errors.dueDate?.message}</FieldError>
            </div>
            <div className="form-field">
              <label htmlFor="status">Task status <span>*</span></label>
              <select id="status" aria-invalid={Boolean(errors.status)} aria-describedby={errors.status ? "status-error" : undefined} {...register("status")}>
                <option value="">Select status</option>{taskStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
              <FieldError id="status-error">{errors.status?.message}</FieldError>
            </div>
          </div>
        </section>
        <div className="form-actions"><span><span className="required-mark">*</span> Required fields</span><div><Link to="/tasks" className="button button-light">Cancel</Link><button className="button button-dark" disabled={isSubmitting} type="submit">{isSubmitting ? "Creating..." : "Create task"}</button></div></div>
      </form>
    </main>
  );
}

function TeamPage() {
  return (
    <main className="workspace-page">
      <SectionHeading eyebrow="WORKSPACE / PEOPLE" title="Your team" description="People will appear here when you add them." />
      <div className="content-card empty-state"><strong>No team members yet.</strong><span>Team profiles will appear here when you add them.</span></div>
    </main>
  );
}

function ProjectsPage() {
  return (
    <main className="workspace-page">
      <SectionHeading eyebrow="WORKSPACE / PROJECTS" title="Projects" description="Your projects will appear here when you add them." action={<Link to="/tasks/new" className="button button-dark">+ Create task</Link>} />
      <div className="content-card empty-state"><strong>No projects yet.</strong><span>Your projects will show up here once they're added.</span></div>
    </main>
  );
}

function NotFoundPage() {
  return <main className="auth-page"><p className="eyebrow">404 / NOT FOUND</p><h1>This page has moved.</h1><p className="section-description">Return to the workspace and find your way from there.</p><Link className="button button-dark" to="/dashboard">Go to overview</Link></main>;
}

function App() {
  const [createdTasks, setCreatedTasks] = useState([]);
  const addTask = (task) => setCreatedTasks((current) => [task, ...current]);

  return (
    <TaskContext.Provider value={{ tasks: createdTasks, addTask }}>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage isRegister />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/new" element={<CreateTaskPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <footer className="site-footer"><Logo /><span>© 2026 Fastline · Built for the long run.</span></footer>
    </TaskContext.Provider>
  );
}

export default App;
