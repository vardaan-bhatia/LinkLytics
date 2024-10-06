import supabase from "./supabase";

// login api
export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
};

// get current user from the local state
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message); // Handle error
  if (!data.session) return null; // If no session, return null
  return data.session?.user; // Return the user if session exists
};
