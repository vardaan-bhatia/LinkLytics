import supabase, { supabaseUrl } from "./supabase";

// login api
export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
};

// logOut
export const logOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

// get current user from the local state
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message); // Handle error
  if (!data.session) return null; // If no session, return null
  return data.session?.user; // Return the user if session exists
};

// SignUp Api
export const signup = async ({ name, email, password, display_pic }) => {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  const { error: storageErr } = await supabase.storage
    .from("display_pic")
    .upload(fileName, display_pic);

  if (storageErr) {
    throw new Error(storageErr.message);
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {},
      name,
      picture: `${supabaseUrl}/storage/v1/object/public/display_pic/${fileName}`,
    },
  });
  if (error) throw new Error(error.message);

  return data;
};
