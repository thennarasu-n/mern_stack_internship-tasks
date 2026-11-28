import axios from "axios";

const mockApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

export async function fetchTasks(signal) {
  const response = await mockApi.get("/todos", {
    params: { _limit: 8 },
    signal,
  });
  return response.data;
}
