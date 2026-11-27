import React from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      priority: "Medium",
      status: "To do",
    },
  });

  const onSubmit = (data) => {
    console.log("New task:", data);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="PulseWorks home">
          <span className="brand-mark">p</span>
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
            <div className="profile-avatar">JD</div>
            <div><strong>Jamie Davis</strong><span>Workspace admin</span></div>
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
                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Finalize homepage wireframes"
                  aria-invalid={Boolean(errors.title)}
                  aria-describedby={errors.title ? "title-error" : undefined}
                  {...register("title", { required: "A task title is required." })}
                />
                {errors.title && <span className="field-error" id="title-error">{errors.title.message}</span>}
              </div>

              <div className="field">
                <label htmlFor="description">Description <span className="optional">Optional</span></label>
                <textarea
                  id="description"
                  rows="4"
                  placeholder="Add context, links, or details your teammate might need..."
                  {...register("description")}
                />
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
                    <select
                      id="assignee"
                      defaultValue=""
                      aria-invalid={Boolean(errors.assignee)}
                      aria-describedby={errors.assignee ? "assignee-error" : undefined}
                      {...register("assignee", { required: "Please choose an assignee." })}
                    >
                      <option value="" disabled>Select a teammate</option>
                      <option value="Jamie Davis">Jamie Davis</option>
                      <option value="Taylor Chen">Taylor Chen</option>
                      <option value="Morgan Lee">Morgan Lee</option>
                      <option value="Riley Patel">Riley Patel</option>
                    </select>
                  </div>
                  {errors.assignee && <span className="field-error" id="assignee-error">{errors.assignee.message}</span>}
                </div>

                <div className="field">
                  <label htmlFor="priority">Priority</label>
                  <div className="select-wrap">
                    <select id="priority" {...register("priority")}>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="dueDate">Due date <span className="required">*</span></label>
                  <input
                    id="dueDate"
                    type="date"
                    aria-invalid={Boolean(errors.dueDate)}
                    aria-describedby={errors.dueDate ? "due-date-error" : undefined}
                    {...register("dueDate", { required: "Please set a due date." })}
                  />
                  {errors.dueDate && <span className="field-error" id="due-date-error">{errors.dueDate.message}</span>}
                </div>

                <div className="field">
                  <label htmlFor="status">Status</label>
                  <div className="select-wrap">
                    <select id="status" {...register("status")}>
                      <option value="To do">To do</option>
                      <option value="In progress">In progress</option>
                      <option value="In review">In review</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <p><span className="required">*</span> Required fields</p>
              <div className="form-buttons">
                <button className="cancel-button" type="reset">Cancel</button>
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
