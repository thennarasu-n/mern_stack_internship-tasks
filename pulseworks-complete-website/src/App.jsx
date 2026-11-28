import React from "react";
import { createContext, useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import {
  carConditions,
  employees,
  priorities,
  raceCars,
  raceStages,
  taskSchema,
  taskStatuses,
} from "./taskSchema.js";

const TaskContext = createContext(null);

function Logo() {
  return (
    <Link to="/" className="brand" aria-label="Fastline home">
      <span className="brand-mark" aria-hidden="true"><img src="/fastline-car-logo.png" alt="" /></span>
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
      <div className="header-actions">
        <Link to="/login" className="account-link">Log in</Link>
        <Link to="/register" className="account-link account-link-primary">Create account</Link>
        <Link to="/tasks/new" className="header-action">New task <span aria-hidden="true">+</span></Link>
      </div>
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
        <img className="hero-car-background" src="/fastline-car-logo.png" alt="" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">YOUR RACE. YOUR TEAM. YOUR CONTROL.</p>
          <h1>Manage the race.<br />Own the result.</h1>
          <p className="hero-description">Bring race teams, cars, maintenance, and event tasks together in one clear motorsport workspace.</p>
          <div className="hero-actions">
            <Link to="/register" className="button button-dark">Create your workspace <span aria-hidden="true">&rarr;</span></Link>
            <Link to="/login" className="button button-light">Sign in</Link>
          </div>
          <div className="hero-note"><span className="note-line" /> From the garage to race day.</div>
        </div>
        <div className="hero-board" aria-label="Fastline workspace preview">
          <div className="board-top"><span className="board-label">RACE CONTROL / OVERVIEW</span><span className="board-date">LIVE</span></div>
          <div className="board-title"><div><span className="eyebrow">GARAGE STATUS</span><h2>Ready for the grid.</h2></div><span className="board-count">00<br /><small>OPEN TASKS</small></span></div>
          <div className="empty-board">
            <span className="start-line" aria-hidden="true" />
            <strong>Your pit wall starts here.</strong>
            <p>Set up a team, choose a car, and plan your first race.</p>
            <Link to="/team" className="board-footer">Build your race team <span aria-hidden="true">&nearr;</span></Link>
          </div>
        </div>
      </section>
      <section className="landing-proof">
        <span>TEAM / DRIVER</span><span>CAR / CONDITION</span><span>RACE / RESULTS</span>
      </section>
      <section className="landing-bottom">
        <div><p className="eyebrow">RACE OPERATIONS</p><h2>Every detail, race-ready.</h2></div>
        <p>Organize crew tasks, manage project cars, and track condition updates from preparation through race day.</p>
      </section>
    </main>
  );
}

function AuthPage({ isRegister = false }) {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (isRegister && form.elements.password.value !== form.elements.confirmPassword.value) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("The form is ready, but account authentication needs a backend service.");
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
        {isRegister && <label>Confirm password<input type="password" name="confirmPassword" autoComplete="new-password" minLength="8" required /></label>}
        <button className="button button-dark" type="submit">{isRegister ? "Create account" : "Sign in"}</button>
      </form>
      {message && <p className="auth-message" role="status">{message}</p>}
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
          <div className="task-name"><strong>{task.title}</strong><small>{task.team} / {task.description}</small></div>
          <span className="task-owner">{task.assignee}</span>
          <span className="task-date">{task.dueDate}</span>
          <span className="task-status">{task.status}</span>
        </article>
      ))}
    </div>
  );
}

function DashboardPage() {
  const { tasks, teams, raceProjects } = useContext(TaskContext);
  const inProgressCount = tasks.filter((task) => task.status === "In Progress").length;
  const completedCount = tasks.filter((task) => task.status === "Completed").length;

  return (
    <main className="workspace-page">
      <SectionHeading eyebrow="YOUR WORKSPACE" title="Good morning, Arasu." description="A clear view of what's moving with your team."
        action={<Link to="/tasks/new" className="button button-dark">+ Create task</Link>} />
      <div className="stat-grid">
        <article><span>RACE TASKS</span><strong>{tasks.length}</strong><small>Across your workspace</small></article>
        <article><span>IN PROGRESS</span><strong>{inProgressCount}</strong><small>Moving forward today</small></article>
        <article><span>COMPLETED</span><strong>{completedCount}</strong><small>Finished tasks</small></article>
        <article><span>RACE TEAMS</span><strong>{teams.length}</strong><small>Crews in your garage</small></article>
        <article><span>RACE PROJECTS</span><strong>{raceProjects.length}</strong><small>Cars on your calendar</small></article>
      </div>
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
  const { addTask: setCreatedTasks, teams } = useContext(TaskContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "", description: "", assignee: "", team: "", priority: "", dueDate: "", status: "" },
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
              <label htmlFor="team">Race team <span>*</span></label>
              <select id="team" aria-invalid={Boolean(errors.team)} aria-describedby={errors.team ? "team-error" : undefined} {...register("team")}>
                <option value="">{teams.length ? "Select a team" : "Create a team first"}</option>
                {teams.map((team) => <option key={team.id} value={team.name}>{team.name}</option>)}
              </select>
              <FieldError id="team-error">{errors.team?.message}</FieldError>
              {!teams.length && <Link className="form-helper-link" to="/team">Create a race team</Link>}
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
  const { teams, addTeam } = useContext(TaskContext);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [formError, setFormError] = useState("");

  function toggleMember(employee) {
    setSelectedMembers((current) => current.includes(employee)
      ? current.filter((member) => member !== employee)
      : [...current, employee]);
  }

  function handleCreateTeam(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = new FormData(form).get("teamName").toString().trim();

    if (!name || selectedMembers.length === 0) {
      setFormError("Add a team name and select at least one team member.");
      return;
    }

    addTeam({ id: `team-${Date.now()}`, name, members: selectedMembers });
    form.reset();
    setSelectedMembers([]);
    setFormError("");
  }

  return (
    <main className="workspace-page">
      <SectionHeading eyebrow="RACE CONTROL / CREW" title="Race teams" description="Build a crew and assign them to race tasks." />
      <form className="content-card management-form" onSubmit={handleCreateTeam}>
        <div className="card-heading"><div><p className="eyebrow">NEW CREW</p><h2>Create a team</h2></div></div>
        <label className="management-field">Team name<input name="teamName" minLength="2" placeholder="e.g. Track support" required /></label>
        <fieldset className="member-picker">
          <legend>Choose team members</legend>
          <div className="member-options">
            {employees.map((employee) => (
              <label key={employee}>
                <input type="checkbox" checked={selectedMembers.includes(employee)} onChange={() => toggleMember(employee)} />
                <span>{employee}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <button className="button button-dark" type="submit">Create team</button>
      </form>
      <section className="team-directory">
        <div className="card-heading"><div><p className="eyebrow">YOUR GARAGE</p><h2>Teams</h2></div><span className="quiet-count">{teams.length} teams</span></div>
        {teams.length === 0
          ? <div className="content-card empty-state"><strong>No teams yet.</strong><span>Create your first crew to assign race tasks.</span></div>
          : <div className="team-grid">{teams.map((team) => (
            <article className="team-card" key={team.id}>
              <span className="team-avatar">#</span>
              <div><strong>{team.name}</strong><span>{team.members.join(", ")}</span></div>
              <span className="member-status">{team.members.length} MEMBERS</span>
            </article>
          ))}</div>}
      </section>
    </main>
  );
}

function ProjectsPage() {
  const { raceProjects, addRaceProject } = useContext(TaskContext);

  function handleCreateProject(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    addRaceProject({
      id: `race-${Date.now()}`,
      name: values.get("projectName").toString().trim(),
      car: values.get("car"),
      condition: values.get("condition"),
      stage: values.get("stage"),
    });
    form.reset();
  }

  return (
    <main className="workspace-page">
      <SectionHeading eyebrow="RACE CONTROL / PROJECTS" title="Race projects" description="Match a project with a car, condition, and race stage." />
      <form className="content-card management-form" onSubmit={handleCreateProject}>
        <div className="card-heading"><div><p className="eyebrow">NEW PROJECT</p><h2>Plan a race project</h2></div></div>
        <div className="management-grid">
          <label className="management-field">Project name<input name="projectName" minLength="2" placeholder="e.g. Summer circuit series" required /></label>
          <label className="management-field">Race car<select name="car" defaultValue="" required><option value="" disabled>Choose a car</option>{raceCars.map((car) => <option key={car}>{car}</option>)}</select></label>
          <label className="management-field">Car condition<select name="condition" defaultValue="" required><option value="" disabled>Choose condition</option>{carConditions.map((condition) => <option key={condition}>{condition}</option>)}</select></label>
          <label className="management-field">Race stage<select name="stage" defaultValue="" required><option value="" disabled>Choose stage</option>{raceStages.map((stage) => <option key={stage}>{stage}</option>)}</select></label>
        </div>
        <button className="button button-dark" type="submit">Create race project</button>
      </form>
      <section className="project-directory">
        <div className="card-heading"><div><p className="eyebrow">RACE CALENDAR</p><h2>Projects</h2></div><span className="quiet-count">{raceProjects.length} projects</span></div>
        {raceProjects.length === 0
          ? <div className="content-card empty-state"><strong>No race projects yet.</strong><span>Create a project and select one of your cars.</span></div>
          : <div className="race-project-grid">{raceProjects.map((project) => (
            <article className="race-project-card" key={project.id}>
              <p className="eyebrow">{project.stage}</p><h3>{project.name}</h3>
              <dl><div><dt>CAR</dt><dd>{project.car}</dd></div><div><dt>CONDITION</dt><dd>{project.condition}</dd></div></dl>
            </article>
          ))}</div>}
      </section>
    </main>
  );
}

function NotFoundPage() {
  return <main className="auth-page"><p className="eyebrow">404 / NOT FOUND</p><h1>This page has moved.</h1><p className="section-description">Return to the workspace and find your way from there.</p><Link className="button button-dark" to="/dashboard">Go to overview</Link></main>;
}

function App() {
  const [createdTasks, setCreatedTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [raceProjects, setRaceProjects] = useState([]);
  const addTask = (task) => setCreatedTasks((current) => [task, ...current]);
  const addTeam = (team) => setTeams((current) => [team, ...current]);
  const addRaceProject = (project) => setRaceProjects((current) => [project, ...current]);

  return (
    <TaskContext.Provider value={{ tasks: createdTasks, addTask, teams, addTeam, raceProjects, addRaceProject }}>
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
