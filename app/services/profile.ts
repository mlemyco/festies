import supabase from "../utils/supabase";

export const getCurrentProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) {
        console.log(error);
        return { data: error, success: false };
    } else {
        console.log("Profile retrieved:", data);
        return { data: data, success: true };
    }
};
