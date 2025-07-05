import { useEffect, useState } from "react";
import { getTags } from "../services/tag.service";
import { NoteTag, TagResponse } from "../models/tag.model";



/** * Custom hook to manage tags in an application.
 * It provides functionality to fetch tags, manage selected tags, and handle loading and error states.
 * @param {number[]} selectedIdTags - Array of tag IDs that are currently selected
 * @param {Function} handleAutoSubmit - Function to handle automatic submission of selected tags
 */
export const useTags = (selectedIdTags: number[], handleAutoSubmit: () => void) => {

    // State variables to manage tags, loading state, error state, and refresh state
    // The tags state holds the list of tags fetched from the API
    const [tags, setTags] = useState<NoteTag[]>([]);

    // The tagsSelected state holds the list of tags that are currently selected
    // It is filtered based on the selectedIdTags passed to the hook
    const [tagsSelected, setTagsSelected] = useState<NoteTag[]>([]);

    // The isLoading state indicates whether the tags are currently being fetched
    // It is set to true when the fetch operation starts and false when it completes
    const [isLoading, setIsLoading] = useState(false);

    // The error state indicates whether there was an error fetching the tags
    // It is set to null initially and can be updated if an error occurs during the fetch
    const [error, setError] = useState<string | null>(null);

    // The refresh state is used to trigger a re-fetch of the tags
    // It is set to true initially to fetch the tags when the hook is first used
    const [refresh, setRefresh] = useState(true);


    // Effect to fetch tags when the component mounts or when the refresh state changes
    // This effect calls the getTags function to fetch the tags from the API
    useEffect(() => {

        if (!refresh) return;

        setIsLoading(true);
        getTags().then((tags: TagResponse) => {
            setTags(tags.data)


            setTagsSelected(tags.data.filter((tag) => selectedIdTags.includes(tag.id!)));


            setRefresh(false);
            setIsLoading(false);

        })
    }, [refresh]);

    // Effect to update the tagsSelected state whenever selectedIdTags or tags change
    // This effect filters the tags based on the selectedIdTags and updates the tagsSelected state
    useEffect(() => {

        setTagsSelected(tags.filter((tag) => selectedIdTags.includes(tag.id!)));
        handleAutoSubmit();
    }, [selectedIdTags, tags])




    return { tags, isLoading, error, refresh, setRefresh, tagsSelected, setTagsSelected }

}
