import { useEffect, useState } from "react";
import { getTags } from "../services/tag.service";
import { NoteTag, TagResponse } from "../models/tag.model";




export const useTags = () => {

    const [tags, setTags] = useState<NoteTag[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(true);


    useEffect(() => {
        if (!refresh) return;

        setIsLoading(true);
        getTags().then((tags: TagResponse) => {
            setTags(tags.data)
            setRefresh(false);
            setIsLoading(false);
        })
    }, [refresh]);


    return { tags, isLoading, error, refresh, setRefresh }

}
