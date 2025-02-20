const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Helper function for making API requests
const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  console.log(API_BASE_URL)
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      // Add any other headers here (like Authorization if needed)
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  return response.json();
};

// GET: Fetch data from an endpoint
export const get = async <T>(url: string): Promise<T> => {
  return apiRequest<T>(url, {
    method: "GET",
  });
};

// POST: Send data to an endpoint
export const post = async <T>(url: string, body: any): Promise<T> => {
  return apiRequest<T>(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

// DELETE: Delete data from an endpoint
export const remove = async <T>(url: string): Promise<T> => {
  return apiRequest<T>(url, {
    method: "DELETE",
  });
};
