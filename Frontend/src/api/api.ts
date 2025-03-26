// api.ts

// Default values if environment variables are not found
const DEFAULT_API_URL = "http://localhost:5297/api";
const DEFAULT_IMAGE_URL = "http://localhost:5297";

let BASE_URL: string;

if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
  // Development mode: Always use the default URL
  BASE_URL = DEFAULT_API_URL;
} else if (typeof process !== "undefined" && process.env.REACT_APP_API_URL) {
  // Other environments (production, etc.) and REACT_APP_API_URL is defined
  BASE_URL = process.env.REACT_APP_API_URL;
} else {
  // Other environments (production, etc.) and REACT_APP_API_URL is not defined
  BASE_URL = DEFAULT_API_URL;
}

const IMAGE_URL =
  typeof process !== "undefined" && process.env.REACT_APP_IMAGE_URL
    ? process.env.REACT_APP_IMAGE_URL
    : DEFAULT_IMAGE_URL;

export { IMAGE_URL };

const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const apiReportTotalRent = (endpoint: string): Promise<any> =>
  fetchData(endpoint);
export const apiReportTotalRevenue = (endpoint: string): Promise<any> =>
  fetchData(endpoint);
export const apiReportTotalSales = (endpoint: string): Promise<any> =>
  fetchData(endpoint);
export const apiReportTotalRentals = (endpoint: string): Promise<any> =>
  fetchData(endpoint);
