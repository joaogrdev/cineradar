import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDk2YjRmNzc4NzdmOWI4NDk3MmRjNThhYjY4OWY4NiIsIm5iZiI6MTczMDgzMjk5MS4yOTI1NTI3LCJzdWIiOiI2NzI5NGMwZDQ3MzExZWI4OTkwYjg0YmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F6QRgbj6OHG2vO6EWk5ks6MFuZw-7xTXGZVxW8Icf0c`,
  },
});

export default api;
