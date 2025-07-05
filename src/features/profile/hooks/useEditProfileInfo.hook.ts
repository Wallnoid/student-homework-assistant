import { updateMember } from '@/features/admin/services/members.service';
import { User } from '@/shared/models/user.model';
import { useLoadChatsStore } from '@/shared/store/loadChat.store';
import { getUserLocal, setUserLocal } from '@/shared/utils/localStorage.utils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


export type EditProfileFormValues = {
    id?: number; // User ID, optional for editing profile
    firstName?: string; // User's first name, optional for editing profile
    lastName?: string; // User's last name, optional for editing profile
    password?: string; // User's password, optional for editing profile
    confirmPassword?: string; // Confirmation of the user's password, optional for editing profile
}

/**
 * Custom hook to manage editing user profile information.
 * It provides methods to handle form submission, loading state, and error handling.
 * 
 * @returns {Object} - Contains user data, loading state, error messages, form methods, and submit handler.
 * * @property {User | null} user - The current user data
 * * @property {boolean} loading - Indicates whether the form is currently submitting
 * * @property {string | null} error - Holds any error messages that occur during submission
 * * @property {Function} register - Method to register form fields
 * * @property {Object} errors - Contains form validation errors
 * * @property {Function} handleSubmit - Method to handle form submission
 * * @property {Function} reset - Function to reset the form fields
 * * @property {Function} getValues - Function to get current form values
 * * @property {Function} onSubmit - Function to handle form submission with user data
 */

export const useEditProfileInfo = () => {

    // Initialize the form with default values for editing profile
    // The form values include id, firstName, lastName, password, and confirmPassword
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<EditProfileFormValues>()

    // State to manage the current user data
    // It is initialized to null and will be set when the user data is fetched from local storage
    // The user state holds the user's information such as id, name, lastName, email, password, role, and organizationId
    // It is used to display and update the user's profile information  
    const [user, setUser] = useState<User | null>(null);

    // State to manage the loading state of the form submission
    // It is initialized to false and will be set to true when the form is being submitted
    const [loading, setLoading] = useState(false)

    // State to manage any error messages that occur during form submission
    // It is initialized to null and will be set to an error message if the form submission
    const [error, setError] = useState<string | null>(null)

    // This hook is used to manage the loading state of chats
    // It allows the component to trigger a reload of chats when the user profile is updated
    const setLoad = useLoadChatsStore((state: any) => state.setLoad)

    // This function is used to reset the form fields to their initial values
    // It sets the values of firstName, lastName, password, and confirmPassword to empty strings
    // This is useful when the user wants to clear the form or start over
    const reset = () => {
        setValue('firstName', '')
        setValue('lastName', '')
        setValue('password', '')
        setValue('confirmPassword', '')
    }


    // This effect is used to fetch the user data from local storage when the component mounts
    // It retrieves the user data using the getUserLocal function and sets the user state with the retrieved data
    // It also sets the form values for id, firstName, and lastName based on the retrieved user data
    // This ensures that the form is pre-populated with the user's current profile information when editing
    useEffect(() => {
        const storedUser = getUserLocal();
        if (storedUser) {
            setUser(storedUser);
            setValue('id', storedUser.id);
            setValue('firstName', storedUser.name || '');
            setValue('lastName', storedUser.lastName || '');
        }
    }, []);


    // This function is called when the form is submitted
    // It takes the form data as an argument and processes it to update the user's profile information
    const onSubmit = (data: EditProfileFormValues) => {
        setLoading(true);

        // Retrieve the current user data from local storage
        const userToSend: User = {
            id: data.id,
            name: (data.firstName?.toUpperCase() ?? user?.name) || '',
            lastName: (data.lastName?.toUpperCase() ?? user?.lastName) || '',
            email: user?.email || '',
            password: data.password,
            role: user?.role,
            organizationId: user?.organizationId,
        }

        if (userToSend.password || userToSend.password === '') {

            delete userToSend.password

        }

        // Send the updated user data to the server
        updateMember(userToSend).then((res) => {
            setError(null);
            setLoading(false);
            setUser(prev => prev ? {
                ...prev,
                name: (data.firstName ?? prev.name) || '',
                lastName: (data.lastName ?? prev.lastName) || '',
                email: prev.email || '', // ensure email is always a string
            } : prev);


            // Update the user data in local storage with the new values
            setUserLocal({
                ...user!,
                name: (data.firstName ?? user?.name) || '',
                lastName: (data.lastName ?? user?.lastName) || '',
                password: ''

            });

            // Set the loading state to false after the update is successful
            setLoad(true);


            toast.success("Se ha actualizado el perfil correctamente.");
        }).catch((err) => {
            console.error("Update error:", err);
            setLoading(false);
            setError(err.message || "An error occurred while updating the profile.");
            toast.error(err.message || "Error al actualizar el perfil.");
        });
    }
    return { user, loading, error, register, errors, handleSubmit, reset, getValues, onSubmit };
}