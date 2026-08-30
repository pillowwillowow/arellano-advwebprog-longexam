const BASE_URL = "http://localhost:8000/api/v1/category";

export const getCategories = async () => {
  const response = await fetch(BASE_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load categories");
  }

  return data;
};
