import supabase from "./supabase";
import { UAParser } from "ua-parser-js";

// Fetch clicks for a specific URL
export const getClicks = async (url_id) => {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", url_id); // Filter clicks by URL ID

  if (error) throw new Error(error.message); // Handle error

  return data; // Return the click data
};

// To store the clicks of the URL
const parser = new UAParser();
export const storeClicks = async ({ id, original_url }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";

    const response = await fetch("https://ipapi.co/json");

    // Check if response is okay before parsing
    if (!response.ok) {
      throw new Error(`Error fetching IP data: ${response.statusText}`);
    }

    const { city, country_name } = await response.json(); // Now this will work

    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country_name,
      device: device,
    });

    // Redirect to the original URL
    window.location.href = original_url;
  } catch (error) {
    console.log(error);
  }
};

export async function getClicksForUrl(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }

  return data;
}
