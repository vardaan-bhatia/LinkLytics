import supabase from "./supabase";
import { UAParser } from "ua-parser-js";

// Fetch clicks for a specific URL
export const getClicks = async (url_id) => {
  try {
    const { data, error } = await supabase
      .from("clicks")
      .select("*")
      .in("url_id", url_id); // Filter clicks by URL ID

    if (error) {
      console.error("Error fetching clicks:", error);
      throw new Error(error.message); // Handle error
    }

    return data; // Return the click data
  } catch (error) {
    console.error("Error in getClicks:", error);
    throw error; // Re-throw the error for further handling
  }
};

// To store the clicks of the URL
export const storeClicks = async ({ id, original_url }) => {
  const parser = new UAParser(); // Initialize UAParser here to limit its scope
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";

    const response = await fetch("https://ipapi.co/json");

    // Check if response is okay before parsing
    if (!response.ok) {
      throw new Error(`Error fetching IP data: ${response.statusText}`);
    }

    const { city, country_name } = await response.json(); // Now this will work

    const { error } = await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country_name,
      device: device,
    });

    if (error) {
      console.error("Error inserting click data:", error);
      throw new Error("Unable to store click data");
    }

    // Redirect to the original URL
    window.location.href = original_url;
  } catch (error) {
    console.error("Error in storeClicks:", error);
    throw error; // Re-throw the error for further handling
  }
};

// Fetch clicks for a specific URL (alternative implementation)
export async function getClicksForUrl(url_id) {
  try {
    const { data, error } = await supabase
      .from("clicks")
      .select("*")
      .eq("url_id", url_id);

    if (error) {
      console.error("Error fetching clicks for URL:", error);
      throw new Error("Unable to load Stats");
    }

    return data;
  } catch (error) {
    console.error("Error in getClicksForUrl:", error);
    throw error; // Re-throw the error for further handling
  }
}
