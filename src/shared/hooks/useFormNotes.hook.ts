import { useEffect, useRef, useState } from "react"
import { Note } from "../models/note.model"
import { useFieldArray, useForm } from "react-hook-form"
import { lineToString } from "../utils/stringUtils.utils"
import { useEditorStore } from "../store/note.store"
import { useDebounce } from "use-debounce"
import { isEquals, isInitialNote } from "../utils/compareObjects.utils"
import { NoteTag } from "../models/tag.model"



/**
 * Custom hook to manage a form for notes in an editor.
 * It provides functionality to handle input lines, title, tags, and submission of note data.
 * This hook integrates with a form library to manage the state and validation of the note form.
 * 
 * @param note - Optional note object to initialize the form with existing values.
 * @returns {Object} - Contains form methods, input management functions, and note editing functionality.
 * * @property {Object} control - Control object for managing form state.
 * * @property {Function} register - Function to register form fields.
 * * * @property {Function} handleSubmit - Function to handle form submission.
 * * @property {Function} onSubmit - Function to handle the submission of note data. 
 * * * @property {Array} fields - Array of input lines managed by the form.
 * * * @property {Function} inputRefs - Refs for each input line to manage
 * focus and interactions.
 * * * @property {Function} handleKeyDown - Function to handle key events for input lines.
 * * * @property {Function} handleNavigateDown - Function to navigate down to the next input line.  
 */
export const useFormNotes = (note?: Note) => {

    // Refs to store references to input elements for managing focus and interactions
    // This allows the hook to keep track of multiple input lines and their states
    const inputRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

    // Hook to get the current note from the editor store
    // This allows the hook to access and manipulate the current note being edited
    const getNote = useEditorStore((state) => state.getNote);

    // Hook to set the current note in the editor store
    // This allows the hook to update the note being edited in the store
    const setNote = useEditorStore((state) => state.setNote);

    // Ref to track if this is the first run of the effect
    // This is used to avoid running certain effects on the initial render
    const isFirstRun = useRef(true);

    // Hook to set the note being edited in the editor store
    // This allows the hook to update the note being edited in the store
    const setNoteEdit = useEditorStore((state) => state.setNoteEdit);

    // Function to get the current note from the editor store
    // This allows the hook to access the note being edited in the store
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

    // State to manage the title of the note
    // This state holds the title of the note being edited
    const [title, setTitle] = useState(getValues('title') || '');

    // State to manage the tags associated with the note
    // This state holds the IDs of the tags associated with the note being edited
    const [tags, setTags] = useState<number[]>([]);

    // Hook to debounce the title input to avoid excessive updates
    // This helps in reducing the number of updates to the note when the title changes rapidly
    const [debouncedTitle] = useDebounce(title, 500);


    // Hook to manage an array of input lines in the form
    // This allows the hook to dynamically add, remove, and update input lines in the note
    const { fields, append, remove, update, insert } = useFieldArray({
        control,
        name: "lines",

    })


    // Effect to initialize the form values when the component mounts
    // This effect runs once when the component mounts to set the initial values of the form
    // It retrieves the current note from the editor store and sets the form values accordingly
    useEffect(() => {

        const note = getNote();
        if (note) {
            mountValues(note);
        }

    }, []);

    // Effect to handle changes in the debounced title
    // This effect runs whenever the debounced title changes, except on the first run
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


    // Effect to handle changes in the note prop
    // This effect runs whenever the note prop changes, allowing the form to update its values accordingly
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
                mountValues(note);
                return
            }



            if (isEquals(noteToCompare, noteLocal)) {

                mountValues(note);
            }

        }
    }, [note]);




    // Function to handle adding a new input line
    // This function appends a new input line to the form and focuses on it
    const handleNewInput = () => {
        const newIndex = fields.length;
        append({
            content: '',
            type: 'input'
        });

        requestAnimationFrame(() => {
            const tryFocus = () => {
                const input = inputRefs.current[newIndex];
                if (input) {
                    input.focus();
                } else {
                    setTimeout(tryFocus, 50);
                }
            };
            tryFocus();
        });
    }

    // Function to handle deleting an input line
    // This function removes an input line from the form and updates the note
    const handleDeleteIAInput = (index: number) => {
        remove(index);
        onSubmit(getValues());
    }

    // Function to mount the values of a note into the form
    // This function sets the title, content, and tags of the note in the form
    const mountValues = (note: Note) => {
        setValue('title', note.title);
        setValue('content', note.content);
        setTitle(note.title);
        setTags(note.tagsIds ?? note.tags?.map((tag) => tag.id!));

        const lines: { content: string; type: 'input' | 'inputIA' }[] = [];
        const contentLines = note.content.split('\n');

        let isInIAInput = false;
        let currentIAInput = '';

        for (const line of contentLines) {
            if (line.includes('@InputIAForEditor')) {
                if (isInIAInput) {
                    currentIAInput += '\n' + line;
                    lines.push({
                        content: currentIAInput.trim(),
                        type: 'inputIA'
                    });
                    currentIAInput = '';
                    isInIAInput = false;
                } else {
                    isInIAInput = true;
                    currentIAInput = line;
                }
            } else if (isInIAInput) {
                currentIAInput += '\n' + line;
            } else {
                if (line.trim()) {
                    lines.push({
                        content: line,
                        type: 'input'
                    });
                }
            }
        }

        if (currentIAInput.trim()) {
            lines.push({
                content: currentIAInput.trim(),
                type: isInIAInput ? 'inputIA' : 'input'
            });
        }

        if (lines.length === 0) {
            lines.push({
                content: '',
                type: 'input'
            });
        }

        setValue('lines', lines);
    };

    // Function to handle activating an IA input line
    // This function updates the type of an input line to 'inputIA' if it is currently 'input'
    const handleActiveIAnote = (index: number) => {
        if (fields[index].type === 'input') {
            update(index, { ...fields[index], type: 'inputIA' });
        }
    }

    // Function to handle activating a regular input line
    // This function updates the type of an input line to 'input' if it is currently 'inputIA'
    // This allows the user to switch back from an IA input to a regular input
    const handleActiveInput = (index: number) => {
        if (fields[index].type === 'inputIA') {
            update(index, { ...fields[index], type: 'input' });
        }
    }

    // Function to navigate up to the previous input line
    // This function focuses on the previous input line if it exists 
    const handleNavigateUp = (index: number) => {
        if (index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Function to navigate down to the next input line
    // This function focuses on the next input line if it exists
    const handleNavigateDown = (index: number) => {
        if (index < fields.length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Function to handle splitting a line into two input lines
    // This function takes the text before and after the cursor position and creates two separate input lines
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

    // Function to handle key down events for input lines
    // This function manages the behavior of the input lines when certain keys are pressed, such as Backspace
    // It allows for merging lines, navigating between lines, and handling special input types like 'inputIA'
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        const textarea = e.target as HTMLTextAreaElement;
        const cursorPosition = textarea.selectionStart;
        const currentValue = textarea.value;

        if (e.key === 'Backspace' && cursorPosition === 0) {
            e.preventDefault();

            if (fields[index - 1]?.type === 'inputIA') {
                return;
            }

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


    // Function to handle key down events for IA input lines
    // This function manages the behavior of IA input lines when certain keys are pressed, such as Backspace
    // It allows for merging lines, navigating between lines, and handling special input types like 'inputIA'
    // This function is specifically designed to handle IA input lines and their unique behavior
    const handleKeyDownIA = (e: React.KeyboardEvent, index: number) => {
        const textarea = e.target as HTMLTextAreaElement;
        const cursorPosition = textarea.selectionStart;
        const currentValue = textarea.value;

        if (e.key === 'Backspace' && cursorPosition === 0 && currentValue.length === 0) {
            e.preventDefault();
            update(index, { ...fields[index], type: 'input' });
            setValue(`lines.${index}.content`, '');
            setTimeout(() => {
                inputRefs.current[index]?.focus();
            }, 0);
        }
    }


    // Function to handle form submission
    // This function is called when the form is submitted, and it processes the note data   
    const onSubmit = (data: Note) => {

        const content = lineToString(data?.lines);

        const dataToSend: Note = {
            title: data.title,
            content: content,
            tagsIds: tags
        }

        setNote(dataToSend);

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
        handleSplitLine, title, setTitle, handleActiveIAnote, handleActiveInput, handleKeyDownIA, handleNewInput, handleDeleteIAInput
    }
}



