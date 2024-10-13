import supabase, { supabaseUrl } from "./supabase";

// Login API
export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message); // Handle login error

  return data; // Return user data
};

// Log out
export const logOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message); // Handle logout error
};

// Get current user from local state
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message); // Handle session error
  if (!data.session) return null; // Return null if no session
  return data.session?.user; // Return user if session exists
};

// SignUp API
export const signup = async ({ name, email, password, profile_pic }) => {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message); // Handle storage error

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`, // Public URL for profile pic
      },
    },
  });

  if (error) throw new Error(error.message); // Handle signup error

  return data; // Return user data
};

// Google sign-in with redirect handling
export const googleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) throw new Error(error.message); // Handle Google login error
  return data; // Return user data
};
