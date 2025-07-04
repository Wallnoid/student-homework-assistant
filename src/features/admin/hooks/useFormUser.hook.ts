import { CreateUserResponse, Role, User } from "@/shared/models/user.model"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createMembers, updateMember } from "../services/members.service"
import { AxiosError } from "axios"
import { useCurrentOrganizationStore } from "@/shared/store/currentOrganization.store"


type InputUser = {
    id?: number // Optional ID for existing users
    name: string // Name of the user
    lastName: string // Last name of the user
    email: string // Email of the user
    password: string // Password of the user
    role: Role // Role of the user (e.g., USER, ADMIN)
    organizationId: number // Organization ID to which the user belongs
}


/**
 * Custom hook to manage user form for creating or updating users.
 * It provides methods to handle form submission, validation, and state management.
 * 
 * @param {Object} props - The properties for the hook.
 * @param {Function} props.onSuccess - Callback function to be called on successful form submission.
 * @param {User} [props.student] - Optional user object for editing an existing user.
 * 
 * @returns {Object} - Contains methods and state for managing the user form.
 * @property {Function} register - Method to register form fields with react-hook-form
 * @property {Function} handleSubmit - Method to handle form submission
 * @property {Object} errors - Object containing form validation errors
 * @property {Function} onSubmit - Method to handle form submission logic
 * @property {Function} setValue - Method to set form field values
 */
export const useFormUser = ({ onSuccess, student }: { onSuccess: () => void, student?: User }) => {

    // useForm hook from react-hook-form to manage form state
    // It provides methods for registering form fields, handling form submission, and managing errors
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<InputUser>()

    // State to manage loading state and error messages
    // The loading state is used to show a loading spinner while the create or update operation is being processed
    const [loading, setLoading] = useState(false)

    // The error state is used to show an error message if the operation fails
    const [error, setError] = useState<string | null>(null)

    // This hook is used to get the current organization from the store
    // It allows the component to access the current organization data
    const currentOrganization = useCurrentOrganizationStore((state: any) => state.org)


    // Method to register form fields
    // This method is used to register form fields with the react-hook-form library
    const reset = () => {
        setValue('name', '')
        setValue('lastName', '')
        setValue('email', '')
        setValue('password', '')
        setValue('role', Role.USER)
    }


    // Effect to set default values for the form
    // This effect runs when the component mounts and sets the initial values for the form fields
    // It sets the role to USER by default and populates the form fields with the student's
    useEffect(() => {

        // Set default values for the form fields
        // If the student exists, it populates the form fields with the student's data
        setValue('role', Role.USER)


        // If the student exists, set the form fields to the student's data
        // This is useful when editing an existing student
        if (student) {
            setValue('name', student.name)
            setValue('lastName', student.lastName)
            setValue('email', student.email)
            setValue('role', student.role!)
        }
    }, [])


    // onSubmit function to handle form submission
    // It takes the form data as input and creates or updates the user based on whether it
    const onSubmit = (data: InputUser) => {

        // If the student already exists, set the ID in the data object
        // This is necessary for the update operation to identify which user to update
        if (student) {
            data.id = student.id
        }

        // Create a new user object with the provided data
        // The organizationId is set to the current organization's ID
        // The name and lastName are converted to uppercase to ensure consistency in naming
        // The password is set to the email for simplicity, but this should be handled securely in a real application
        // The user object is used to create or update the user in the system
        const user = {
            ...data,
            organizationId: currentOrganization.id,
            name: (data.name).toUpperCase(),
            lastName: (data.lastName).toUpperCase(),
            password: data.email
        }

        // Set the loading state to true to indicate that the operation is in progress
        // This is used to show a loading spinner while the create or update operation is being processed
        // The loading state is set to true to indicate that the operation is in progress
        setLoading(true)

        // If the student already exists, update it using the updateMember function
        // If it does not exist, create a new user using the createMembers function
        if (student) {
            updateMember(user).then((res: CreateUserResponse) => {
                console.log(res)
                // If the update is successful, set the loading state to false, clear the error state, and call the onSuccess callback
                setLoading(false)
                // The error state is set to null to clear any previous error messages
                setError(null)
                // The onSuccess callback is used to perform any additional actions after the user is created or updated
                // This could include updating the user list, showing a success message, etc.
                onSuccess()
            }).catch((err: AxiosError) => {
                console.log(err)
                setLoading(false)
                setError((err.response?.data as CreateUserResponse).message.content[0])
            })
        } else {

            // If the student does not exist, create a new user

            createMembers(user).then((res: CreateUserResponse) => {
                console.log(res)
                // If the creation is successful, set the loading state to false, clear the error state, and call the onSuccess callback
                setLoading(false)
                // The error state is set to null to clear any previous error messages
                setError(null)
                // The onSuccess callback is used to perform any additional actions after the user is created
                onSuccess()
            }).catch((err: AxiosError) => {
                console.log(err)
                setLoading(false)
                setError((err.response?.data as CreateUserResponse).message.content[0])
            })

        }



    }
    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        setValue,
        error,
        loading,
        reset
    }

}
