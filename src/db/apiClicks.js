import supabase from "./supabase";

// Fetch clicks for a specific URL
export const getClicks = async (url_id) => {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", url_id); // Filter clicks by URL ID

  if (error) throw new Error(error.message); // Handle error

  return data; // Return the click data
};
