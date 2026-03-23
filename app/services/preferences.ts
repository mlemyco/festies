import supabase from "../utils/supabase";

export const getPreferenceForSetTime = async (
    eventId: number,
    artistId: number,
) => {
    const userId = (await supabase.auth.getUser()).data.user?.id;

    const { data, error } = await supabase
        .from("preferences")
        .select("preference")
        .eq("user_id", userId)
        .eq("edmtrain_event_id", eventId);
    // .eq("edmtrain_artist_id", artistId);

    if (error) {
        console.error(error);
        return null;
    } else {
        console.log(
            `Retrieved preference for event ${eventId}, artist ${artistId}`,
        );
        return data;
    }
};

export const getPreferencesForEvent = async (eventId: number) => {
    const userId = (await supabase.auth.getUser()).data.user?.id;

    const { data, error } = await supabase
        .from("preferences")
        .select("edmtrain_artist_id, preference")
        .eq("user_id", userId)
        .eq("edmtrain_event_id", eventId);

    if (error) {
        console.error(error);
        return null;
    } else {
        console.log(`Retrieved preferences for event ${eventId}`);
        return data;
    }
};

export const updatePreference = async (
    eventId: number,
    artistId: number,
    preference: number,
) => {
    const userId = (await supabase.auth.getUser()).data.user?.id;

    const { data: existing } = await supabase
        .from("preferences")
        .select("*")
        .eq("user_id", userId)
        .eq("edmtrain_event_id", eventId)
        .eq("edmtrain_artist_id", artistId)
        .single();

    if (existing) {
        const { data, error } = await supabase
            .from("preferences")
            .update({ preference })
            .eq("user_id", userId)
            .eq("edmtrain_event_id", eventId)
            .eq("edmtrain_artist_id", artistId);

        if (error) {
            console.error(error);
            return { data: error, success: false };
        } else {
            console.log(
                `Updated preference for event ${eventId}, artist ${artistId} to ${preference}`,
            );
            return { data, success: true };
        }
    }
    const { data, error } = await supabase.from("preferences").insert({
        user_id: userId,
        edmtrain_event_id: eventId,
        edmtrain_artist_id: artistId,
        preference,
    });

    if (error) {
        console.error(error);
        return { data: error, success: false };
    } else {
        console.log(
            `Added preference for event ${eventId}, artist ${artistId} to ${preference}`,
        );
        return { data, success: true };
    }
};
