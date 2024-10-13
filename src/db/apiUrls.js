import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

// Get URLs for a specific user
export const getUrls = async (user_id) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id); // Filter by user ID

  if (error) throw new Error(error.message); // Handle any errors

  return data; // Return the retrieved data
};

// Delete a specific URL by ID
export const deleteUrls = async (id) => {
  const { data, error } = await supabase.from("urls").delete().eq("id", id); // Delete the URL with the given ID

  if (error) throw new Error(error.message); // Handle any errors

  return data; // Return the deleted data
};

// Create a new short URL
export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  const short_url = Math.random().toString(36).slice(2, 6); // Generate a random short URL
  const fileName = `qr-${short_url}`; // Create a filename for the QR code

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode); // Upload the QR code image

  if (storageError) throw new Error(storageError.message); // Handle storage errors

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`; // Construct the public URL for the QR code

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        user_id,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url,
        qr,
      },
    ])
    .select(); // Insert the new URL into the database

  if (error) {
    console.error(error); // Log error for debugging
    throw new Error("Error creating short URL"); // Handle insertion errors
  }

  return data; // Return the created URL data
}

// get long urls

export const getlongUrl = async (id) => {
  const { data, error } = await supabase
    .from("urls")
    .select("id,original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single(); // Delete the URL with the given ID

  if (error) throw new Error(error.message); // Handle any errors

  return data; // Return the deleted data
};

// single url for link page to show single url and the analytics

export const getSingleUrl = async ({ id, user_id }) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Short Url not found");
  }

  return data;
};
