import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const employees = ["Employee 01", "Employee 02", "Employee 03", "Employee 04"];
const priorities = ["Low", "Medium", "High"];
const statuses = ["Pending", "In Progress", "Completed"];

const taskSchema = z.object({
  title: z.string().trim().min(3, "Task title must be at least 3 characters."),
  description: z.string().trim().min(1, "Please enter a task description."),
  assignee: z.string().refine((value) => employees.includes(value), "Please select an employee."),
  priority: z.string().refine((value) => priorities.includes(value), "Please select Low, Medium, or High priority."),
  dueDate: z.string().refine((value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsedDate = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(parsedDate.getTime()) && parsedDate.toISOString().slice(0, 10) === value;
  }, "Please select a valid due date."),
  status: z.string().refine((value) => statuses.includes(value), "Please select a task status."),
});

function FieldError({ id, children }) {
  return children ? <span className="field-error" id={id} role="alert">{children}</span> : null;
}

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee: "",
      priority: "",
      dueDate: "",
      status: "",
    },
  });

  const onSubmit = (data) => {
    console.log("New task:", data);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="PulseWorks home">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span>pulseworks</span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="navigation" aria-label="Main navigation">
          <a href="#" className="nav-item"><span className="nav-icon">⌂</span> Overview</a>
          <a href="#" className="nav-item active"><span className="nav-icon">▤</span> Tasks <span className="nav-count">12</span></a>
          <a href="#" className="nav-item"><span className="nav-icon">▦</span> Projects</a>
          <a href="#" className="nav-item"><span className="nav-icon">♙</span> Team</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-spark">✳</div>
            <strong>Need a hand?</strong>
            <p>Visit our help center to get unstuck.</p>
            <a href="mailto:hello@pulseworks.example">Get help <span aria-hidden="true">↗</span></a>
          </div>
          <div className="profile">
            <div className="profile-avatar">AA</div>
            <div><strong>Arasu</strong><span>Workspace admin</span></div>
            <button type="button" aria-label="Profile options">···</button>
          </div>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div className="breadcrumbs"><span>Tasks</span><span className="crumb-chevron">/</span><strong>New task</strong></div>
          <div className="topbar-right">
            <span className="workspace-pill"><span className="online-dot" /> Acme Studio</span>
            <button className="notification-button" type="button" aria-label="Notifications">♧<i /></button>
            <div className="mini-avatar">JD</div>
          </div>
        </header>

        <div className="content">
          <div className="page-heading">
            <div>
              <div className="back-link"><span aria-hidden="true">←</span> <a href="#">Back to tasks</a></div>
              <h1>Create a new task</h1>
              <p>Break down the work and get your team moving.</p>
            </div>
            <div className="heading-decoration" aria-hidden="true"><span>✳</span></div>
          </div>

          <form className="task-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-section">
              <div className="section-heading">
                <span className="section-number">01</span>
                <div><h2>Task details</h2><p>Start with the essentials.</p></div>
              </div>

              <div className="field">
                <label htmlFor="title">Task title <span className="required">*</span></label>
                <input id="title" type="text" placeholder="e.g. Finalize homepage wireframes"
                  aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "title-error" : undefined}
                  {...register("title")} />
                <FieldError id="title-error">{errors.title?.message}</FieldError>
              </div>

              <div className="field">
                <label htmlFor="description">Description <span className="required">*</span></label>
                <textarea id="description" rows="4" placeholder="Add context, links, or details your teammate might need..."
                  aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : undefined}
                  {...register("description")} />
                <FieldError id="description-error">{errors.description?.message}</FieldError>
                <div className="field-hint">A clear description helps everyone stay on the same page.</div>
              </div>
            </div>

            <div className="form-section assignment-section">
              <div className="section-heading">
                <span className="section-number">02</span>
                <div><h2>Planning &amp; assignment</h2><p>Set an owner and a timeline.</p></div>
              </div>

              <div className="field-grid">
                <div className="field">
                  <label htmlFor="assignee">Assigned employee <span className="required">*</span></label>
                  <div className="select-wrap">
                    <select id="assignee" aria-invalid={Boolean(errors.assignee)}
                      aria-describedby={errors.assignee ? "assignee-error" : undefined} {...register("assignee")}>
                      <option value="">Select a teammate</option>
                      {employees.map((employee) => <option key={employee} value={employee}>{employee}</option>)}
                    </select>
                  </div>
                  <FieldError id="assignee-error">{errors.assignee?.message}</FieldError>
                </div>

                <div className="field">
                  <label htmlFor="priority">Priority <span className="required">*</span></label>
                  <div className="select-wrap">
                    <select id="priority" aria-invalid={Boolean(errors.priority)}
                      aria-describedby={errors.priority ? "priority-error" : undefined} {...register("priority")}>
                      <option value="">Select priority</option>
                      {priorities.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
                    </select>
                  </div>
                  <FieldError id="priority-error">{errors.priority?.message}</FieldError>
                </div>

                <div className="field">
                  <label htmlFor="dueDate">Due date <span className="required">*</span></label>
                  <input id="dueDate" type="date" aria-invalid={Boolean(errors.dueDate)}
                    aria-describedby={errors.dueDate ? "due-date-error" : undefined} {...register("dueDate")} />
                  <FieldError id="due-date-error">{errors.dueDate?.message}</FieldError>
                </div>

                <div className="field">
                  <label htmlFor="status">Status <span className="required">*</span></label>
                  <div className="select-wrap">
                    <select id="status" aria-invalid={Boolean(errors.status)}
                      aria-describedby={errors.status ? "status-error" : undefined} {...register("status")}>
                      <option value="">Select status</option>
                      {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </div>
                  <FieldError id="status-error">{errors.status?.message}</FieldError>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <p><span className="required">*</span> Required fields</p>
              <div className="form-buttons">
                <button className="cancel-button" type="button" onClick={() => reset()}>Cancel</button>
                <button className="submit-button" type="submit"><span>＋</span> Create task</button>
              </div>
            </div>
          </form>

          <footer className="main-footer"><span>© 2025 PulseWorks</span><span>Made for teams that do great work <b>✳</b></span></footer>
        </div>
      </section>
    </main>
  );
}

export default App;
