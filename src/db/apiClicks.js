import supabase from "./supabase";

export const getClicks = async (url_id) => {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", url_id);

  if (error) throw new Error(error.message);

  return data;
};
