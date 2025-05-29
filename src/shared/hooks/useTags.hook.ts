import { useEffect, useState } from "react";
import { getTags } from "../services/tag.service";
import { NoteTag, TagResponse } from "../models/tag.model";




export const useTags = (selectedIdTags: number[], handleAutoSubmit: () => void) => {

    const [tags, setTags] = useState<NoteTag[]>([]);
    const [tagsSelected, setTagsSelected] = useState<NoteTag[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(true);


    useEffect(() => {

        if (!refresh) return;

        setIsLoading(true);
        getTags().then((tags: TagResponse) => {
            setTags(tags.data)

            console.log('tags', tags)
            console.log('asdasdasdasdasd fadfasd', tags.data.filter((tag) => selectedIdTags.includes(tag.id!)))
            setTagsSelected(tags.data.filter((tag) => selectedIdTags.includes(tag.id!)));


            setRefresh(false);
            setIsLoading(false);

        })
    }, [refresh]);


    useEffect(() => {

        setTagsSelected(tags.filter((tag) => selectedIdTags.includes(tag.id!)));
        handleAutoSubmit();
    }, [selectedIdTags, tags])




    return { tags, isLoading, error, refresh, setRefresh, tagsSelected, setTagsSelected }

}
