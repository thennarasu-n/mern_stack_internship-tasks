import { z } from "zod";

export const employees = ["Employee 01", "Employee 02", "Employee 03", "Employee 04"];
export const priorities = ["Low", "Medium", "High"];
export const taskStatuses = ["Pending", "In Progress", "Completed"];
export const raceCars = ["Apex GT-R", "Velocity RS", "Vortex GT", "Striker X"];
export const carConditions = ["Race ready", "Inspection due", "In service", "Out of service"];
export const raceStages = ["Planning", "Practice", "Qualifying", "Race day"];

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export const taskSchema = z.object({
  title: z.string().trim().min(3, "Task title must be at least 3 characters."),
  description: z.string().trim().min(1, "Please enter a task description."),
  assignee: z.string().refine((value) => employees.includes(value), "Please select an employee."),
  team: z.string().trim().min(1, "Please create or select a team."),
  priority: z.string().refine((value) => priorities.includes(value), "Please select Low, Medium, or High priority."),
  dueDate: z.string().refine(isValidDate, "Please select a valid due date."),
  status: z.string().refine((value) => taskStatuses.includes(value), "Please select a task status."),
});
