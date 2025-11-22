// src/services/api.ts
const API_URL = "http://localhost:3000";

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error al llamar ${path}: ${err}`);
  }
  return res.json();
}

/* === TASKS === */
export const getTasks = () => apiFetch("/tasks");
export const getTaskById = (id: number) => apiFetch(`/tasks/${id}`);
export const createTask = (data: any) =>
  apiFetch("/tasks", { method: "POST", body: JSON.stringify(data) });
export const updateTask = (id: number, data: any) =>
  apiFetch(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteTask = (id: number) =>
  apiFetch(`/tasks/${id}`, { method: "DELETE" });
export const markTaskAsDone = (id: number) =>
  apiFetch(`/tasks/${id}/done`, { method: "PATCH" });
export const getTasksByCategory = (category: string) =>
  apiFetch(`/tasks/category/${category}`);
export const getTasksByDate = (date: string) =>
  apiFetch(`/tasks/date/${date}`);
export const getTasksInRange = (from: string, to: string) =>
  apiFetch(`/tasks/range/${from}/${to}`);

/* === PET === */
export const getPet = () => apiFetch("/pet");
export const unlockPet = () =>
  apiFetch("/pet/unlock", { method: "POST" });
export const addExperience = (points: number) =>
  apiFetch("/pet/experience", {
    method: "POST",
    body: JSON.stringify({ points }),
  });
export const renamePet = (name: string) =>
  apiFetch("/pet/rename", {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });

/* === USER PROGRESS === */
export const getUserProgress = () => apiFetch("/user-progress");
export const addExperienceToUser = (points: number) =>
  apiFetch("/user-progress/experience", {
    method: "POST",
    body: JSON.stringify({ points }),
  });

/* === HISTORY === */
export const getHistory = () => apiFetch("/history");
export const getCompletedHistory = () => apiFetch("/history/completed");
export const getPendingHistory = () => apiFetch("/history/pending");
export const addToHistory = (data: any) =>
  apiFetch("/history", { method: "POST", body: JSON.stringify(data) });

/* === SOCIAL === */
export const getSharedTasks = () => apiFetch("/social");
export const getSharedWith = (id: number) =>
  apiFetch(`/social/${id}/shared-with`);
export const shareTask = (id: number, sharedWith: string) =>
  apiFetch(`/social/${id}/share`, {
    method: "PATCH",
    body: JSON.stringify({ sharedWith }),
  });

/* === INTERFACES === */
export interface TaskResponse {
  id: number;
  title: string;
  description?: string;
  category?: string;
  dueDate?: string;
  done: boolean;
  shared?: boolean;
  sharedWith?: string;
}

export interface PetResponse {
  id: number;
  name: string;
  level: number;
  experience: number;
  unlocked: boolean;
}

/* === OBJETOS AGRUPADOS === */
export const tasksApi = {
  getAll: getTasks,
  getOne: getTaskById,
  create: createTask,
  update: updateTask,
  delete: deleteTask,
  markAsDone: markTaskAsDone,
  getByCategory: getTasksByCategory,
  getByDate: getTasksByDate,
  getByRange: getTasksInRange,
};

export const petApi = {
  get: getPet,
  unlock: unlockPet,
  addExperience: addExperience,
  rename: renamePet,
};

export const historyApi = {
  getAll: getHistory,
  getCompleted: getCompletedHistory,
  getPending: getPendingHistory,
  add: addToHistory,
};

export const socialApi = {
  getSharedTasks: getSharedTasks,
  getSharedWith: getSharedWith,
  shareTask: shareTask,
};