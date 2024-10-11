import supabase from "./supabase";

export const getUrls = async (user_id) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw new Error(error.message);

  return data;
};
export const deleteUrls = async (id) => {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) throw new Error(error.message);

  return data;
};
