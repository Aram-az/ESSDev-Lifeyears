// src/api.js
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

async function fetchJson(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
}

export function getMockRecommendations() {
  return fetchJson("/mock-recommendations");
}

export function getMockUser() {
  return fetchJson("/mock-user");
}
