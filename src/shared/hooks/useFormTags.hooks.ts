import { useState } from "react";
import { NoteTag } from "../models/tag.model";
import { createTag, deleteTag, updateTag } from "../services/tag.service";
import toast from "react-hot-toast";



export type FormTagsProps = {
    refresh: () => void;
}



export const useFormTags = ({ refresh }: FormTagsProps) => {
    const [id, setId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [color, setColor] = useState('#9b2048');
    const [showTagForm, setShowTagForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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

    const handleShowTagForm = () => {
        setShowTagForm(!showTagForm);
    }

    const handleSetShowTagForm = (show: boolean) => {
        setShowTagForm(show);
    }

    const handleColorChange = (color: string) => {
        setColor(color);
    }

    const handleNameChange = (name: string) => {
        setName(name);
    }

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

    const fillForm = (tag: NoteTag) => {
        console.log(tag)
        setId(tag.id!);
        setName(tag.name);
        setColor(tag.color);
        setIsEditing(true);
    }

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
