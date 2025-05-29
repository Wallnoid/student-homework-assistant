import { useEffect, useRef, useState } from "react"
import { Note } from "../models/note.model"
import { useFieldArray, useForm } from "react-hook-form"
import { lineToString } from "../utils/stringUtils.utils"
import { useEditorStore } from "../store/note.store"
import { useDebounce } from "use-debounce"
import { isEquals, isInitialNote } from "../utils/compareObjects.utils"
import { NoteTag } from "../models/tag.model"



export const useFormNotes = (note?: Note) => {
    const inputRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
    const getNote = useEditorStore((state) => state.getNote);
    const setNote = useEditorStore((state) => state.setNote);
    const isFirstRun = useRef(true);
    const setNoteEdit = useEditorStore((state) => state.setNoteEdit);
    const noteEdit = useEditorStore((state) => state.getNoteEdit);

    const { control, handleSubmit, register, getValues, setValue } = useForm<Note>({
        defaultValues: {
            title: "",
            content: "",
            lines: [
                {
                    content: "",
                    type: "input"
                }
            ]
        }
    })

    const [title, setTitle] = useState(getValues('title') || '');
    const [tags, setTags] = useState<number[]>([]);
    const [debouncedTitle] = useDebounce(title, 500);

    const { fields, append, remove, update, insert } = useFieldArray({
        control,
        name: "lines",

    })


    useEffect(() => {

        const note = getNote();
        if (note) {
            mountValues(note);
        }
    }, []);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        if (debouncedTitle !== undefined) {
            setValue('title', debouncedTitle);
            handleSubmit(onSubmit)();

        }


    }, [debouncedTitle]);


    useEffect(() => {

        const noteLocal = getNote();

        if (note) {


            const tagsIds = note.tags?.map((tag) => tag.id);

            setNoteEdit(note);

            const noteToCompare = {
                title: note.title,
                content: note.content,
                tagsIds: tagsIds
            }

            if (isInitialNote(noteLocal)) {
                console.log('isInitialNote')
                console.log('note', note)
                mountValues(note);
                return
            }



            if (isEquals(noteToCompare, noteLocal)) {

                mountValues(note);
            }

        }
    }, [note]);


    const mountValues = (note: Note) => {
        setValue('title', note.title);
        setValue('content', note.content);
        setTitle(note.title);
        setTags(note.tagsIds ?? note.tags?.map((tag) => tag.id!));
        const lines = note.content.split('\n').map(line => ({
            content: line,
            type: 'input'
        }));

        setValue('lines', lines);

    }


    const handleActiveIAnote = (index: number) => {

        if (fields[index].type === 'input') {
            update(index, { ...fields[index], type: 'inputIA' });
        }
    }

    const handleActiveInput = (index: number) => {
        if (fields[index].type === 'inputIA') {
            update(index, { ...fields[index], type: 'input' });
        }
    }




    const handleNavigateUp = (index: number) => {
        if (index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleNavigateDown = (index: number) => {
        if (index < fields.length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };


    const handleSplitLine = (index: number, textBeforeCursor: string, textAfterCursor: string) => {
        if (!fields[index]) return;

        update(index, { ...fields[index], content: textBeforeCursor });

        insert(index + 1, {
            id: Date.now(),
            content: textAfterCursor,
            type: 'input'
        });

        setTimeout(() => {
            inputRefs.current[index + 1]?.focus();
        }, 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        const textarea = e.target as HTMLTextAreaElement;
        const cursorPosition = textarea.selectionStart;
        const currentValue = textarea.value;

        if (e.key === 'Backspace' && cursorPosition === 0) {
            e.preventDefault();

            if (index > 0 && fields[index - 1]) {
                const prevContent = fields[index - 1].content + currentValue;

                update(index - 1, {
                    ...fields[index - 1],
                    content: prevContent
                });

                remove(index);

                setTimeout(() => {
                    const prevInput = inputRefs.current[index - 1];
                    if (prevInput) {
                        prevInput.focus();
                        const len = prevInput.value.length;
                        prevInput.selectionStart = prevInput.selectionEnd = len;
                    }
                }, 0);

                return;
            }
        }

    };

    const onSubmit = (data: Note) => {

        const content = lineToString(data?.lines);


        console.log(tags)

        const dataToSend: Note = {
            title: data.title,
            content: content,
            tagsIds: tags
        }

        console.log('dataToSend', dataToSend)
        setNote(dataToSend);
        // toast.success('completo')

    }


    return {
        control,
        register,
        tags,
        setTags,
        handleSubmit,
        fields,
        onSubmit,
        inputRefs,
        handleKeyDown,
        handleNavigateDown,
        handleNavigateUp,
        handleSplitLine, title, setTitle, handleActiveIAnote, handleActiveInput
    }
}



