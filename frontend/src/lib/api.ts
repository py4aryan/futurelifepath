// src/lib/api.ts

const BASE_URL = 'http://localhost:3001/api';

const request = async (path: string, options: RequestInit = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (name: string, email: string, password: string) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),

  login: (email: string, password: string) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  logout: () => request('/auth/logout', { method: 'POST' }),

  getMe: () => request('/auth/me'),

  updatePreferences: (prefs: { notificationsEnabled?: boolean; appLockEnabled?: boolean }) =>
    request('/auth/preferences', { method: 'PUT', body: JSON.stringify(prefs) }),

  /** Saves the onboarding survey and generates personalised daily quests */
  completeOnboarding: (profile: {
    goals: string[];
    interests: string[];
    strengths: string[];
    weaknesses: string[];
    currentSituation: string;
    struggles: string[];
  }) =>
    request('/auth/complete-onboarding', { method: 'PUT', body: JSON.stringify(profile) }),

  forgotPassword: (email: string) =>
    request('/auth/forgotpassword', { method: 'POST', body: JSON.stringify({ email }) }),

  resetPassword: (token: string, password: string) =>
    request(`/auth/resetpassword/${token}`, { method: 'PUT', body: JSON.stringify({ password }) }),
};

// ── Skills ────────────────────────────────────────────────────────────────────
export const skillsAPI = {
  getToday: () => request('/skills/today'),
  create:   (skill: object) => request('/skills', { method: 'POST', body: JSON.stringify(skill) }),
  complete: (id: string)    => request(`/skills/${id}/complete`, { method: 'PUT' }),
};

// ── Roadmaps ──────────────────────────────────────────────────────────────────
export const roadmapsAPI = {
  getActive: () => request('/roadmaps/active'),
  completeStage: (roadmapId: string, stageId: string) =>
    request(`/roadmaps/${roadmapId}/stages/${stageId}/complete`, { method: 'PUT' }),
};

// ── Progress ──────────────────────────────────────────────────────────────────
export const progressAPI = {
  getSummary:      () => request('/progress/summary'),
  getAchievements: () => request('/progress/achievements'),
};

// ── Locked Apps ───────────────────────────────────────────────────────────────
export const lockedAppsAPI = {
  getAll:    () => request('/locked-apps'),
  checkStatus: () => request('/locked-apps/status'),
  unlock:    (id: string) => request(`/locked-apps/${id}/unlock`, { method: 'PUT' }),
  updatePreference: (id: string, data: object) =>
    request(`/locked-apps/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};
