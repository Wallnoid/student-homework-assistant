import { useState } from "react";
import { NoteTag } from "../models/tag.model";
import { createTag, deleteTag, updateTag } from "../services/tag.service";
import toast from "react-hot-toast";



export type FormTagsProps = {
    refresh: () => void; // Function to refresh the tags list
    // This function will be called whenever a tag is created, updated, or deleted
}


/**
 * Custom hook to manage the form for creating and editing tags.
 * It provides functionality to handle form submission, show/hide the form,
 * manage tag data, and perform CRUD operations on tags.
 * 
 * @param {FormTagsProps} props - The properties for the useFormTags hook
 * @returns {Object} - Contains tag data, form visibility, loading state, and functions to handle form actions
 * * @property {string} name - The name of the tag
 * * @property {string} color - The color of the tag
 * * * @property {boolean} showTagForm - Indicates whether the tag form is visible
 * * @property {Function} handleSubmit - Function to handle form submission
 * * * @property {Function} handleShowTagForm - Function to toggle the visibility of the tag form
 * * @property {Function} handleSetShowTagForm - Function to set the visibility of
 * the tag form
 * * @property {Function} handleColorChange - Function to handle color changes in the tag 
 * * * @property {Function} handleNameChange - Function to handle name changes in the tag
 * * @property {boolean} isLoading - Indicates whether the form is currently loading
 * * * @property {Function} handleDeleteTag - Function to delete a tag
 * * @property {boolean} isEditing - Indicates whether the form is in editing mode
 */
export const useFormTags = ({ refresh }: FormTagsProps) => {
    // State variables to manage tag data, form visibility, loading state, and editing state
    // The id state holds the ID of the tag being edited or created
    // It is used to identify the tag when performing CRUD operations
    const [id, setId] = useState<number | null>(null);

    // The name state holds the name of the tag being created or edited
    const [name, setName] = useState('');

    // The color state holds the color of the tag being created or edited
    // It is used to set the color of the tag in the UI and when performing CRUD operations
    // The default color is set to '#9b2048', which is a shade of red
    // This color can be changed by the user when creating or editing a tag
    const [color, setColor] = useState('#9b2048');

    // State to manage the visibility of the tag form
    // This state determines whether the form for creating or editing a tag is visible
    // It is used to toggle the form's visibility when the user clicks on a button or
    const [showTagForm, setShowTagForm] = useState(false);

    // State to manage the loading state of the form
    // This state indicates whether the form is currently processing a request, such as creating or updating
    const [isLoading, setIsLoading] = useState(false);

    // State to manage whether the form is in editing mode
    // This state indicates whether the form is being used to edit an existing tag or create a
    const [isEditing, setIsEditing] = useState(false);


    // Function to handle form submission
    // This function is called when the user submits the form to create or edit a tag
    const handleSubmit = () => {

        setIsLoading(true);
        if (name && color) {

            const tag: NoteTag = {
                name,
                color,
            }

            if (isEditing) {
                tag.id = id!;
                updateTag(tag).then((res) => {
                    toast.success('Etiqueta editada correctamente');
                    setIsEditing(false);
                    setShowTagForm(false);
                    refresh();
                })
                    .catch((err) => {
                        toast.error('Error al editar la etiqueta');
                        console.log(err);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    })
            } else {
                createTag(tag).then((res) => {

                    toast.success('Etiqueta creada correctamente');
                    setName('');
                    setColor('');
                    setShowTagForm(false);
                    refresh();
                })
                    .catch((err) => {
                        toast.error('Error al crear la etiqueta');
                        console.log(err);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    })
            }
        }
    }

    // Function to toggle the visibility of the tag form
    // This function is called when the user clicks on a button to show or hide the form
    const handleShowTagForm = () => {
        setShowTagForm(!showTagForm);
    }

    // Function to set the visibility of the tag form
    // This function is used to explicitly set the visibility of the form, for example, when
    const handleSetShowTagForm = (show: boolean) => {
        setShowTagForm(show);
    }

    // Function to handle color changes in the tag
    // This function is called when the user selects a color for the tag
    const handleColorChange = (color: string) => {
        setColor(color);
    }

    // Function to handle name changes in the tag
    // This function is called when the user types in the name input field for the tag
    const handleNameChange = (name: string) => {
        setName(name);
    }

    // Function to delete a tag
    // This function is called when the user clicks on a button to delete a tag
    const handleDeleteTag = () => {
        if (id) {
            deleteTag(id).then((res) => {
                toast.success('Etiqueta eliminada correctamente');
                refresh();
            })
                .catch((err) => {
                    toast.error('Error al eliminar la etiqueta');
                    console.log(err);
                })
                .finally(() => {
                    clearForm();
                    setShowTagForm(false);
                })
        }
    }

    // Function to fill the form with the data of a tag
    // This function is called when the user clicks on a tag to edit it
    const fillForm = (tag: NoteTag) => {
        console.log(tag)
        setId(tag.id!);
        setName(tag.name);
        setColor(tag.color);
        setIsEditing(true);
    }

    // Function to clear the form
    // This function is called to reset the form fields when the user finishes editing or creating a
    const clearForm = () => {
        setId(null);
        setName('');
        setColor('#9b2048');
        setIsEditing(false);
    }



    return {
        name,
        color,
        showTagForm,
        handleSubmit,
        handleShowTagForm,
        handleSetShowTagForm,
        handleColorChange,
        handleNameChange,
        isLoading,
        handleDeleteTag,
        isEditing,
        setIsEditing,
        fillForm,
        clearForm
    }
}
