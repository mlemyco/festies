import supabase from "../utils/supabase";

export const signUp = async (
    username: string,
    email: string,
    password: string,
) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.log(error);
        return { data: error, success: false };
    }

    if (!data.user) {
        return { data: data, success: false };
    }

    console.log("User created:", data);

    const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert([{ user_id: data.user?.id, username: username }])
        .select();

    if (profileError) {
        console.log(profileError);
    } else {
        console.log("Profile created:", profileData);
    }

    return { data: data, success: true };
};

export const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.log(error);
        return { data: error, success: false };
    }

    console.log("Logged in:", data);
    return { data: data, success: true };
};

/**
 * Gets User of current session.
 * @returns null if no user found, otherwise, the user
 */
export const getCurrentUser = async () => {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        console.log(error);
        return null;
    }

    console.log("Current user:", user?.email);
    return user;
};
