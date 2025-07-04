import { CreateUserResponse, Role, User } from "@/shared/models/user.model"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createMembers, updateMember } from "../services/members.service"
import { AxiosError } from "axios"
import { useCurrentOrganizationStore } from "@/shared/store/currentOrganization.store"
import { Organization } from "@/shared/models/organization.model"
import { createOrganizations, updateOrganizations } from "../services/organizations.service"


type InputOrg = {
    id?: number // Optional ID for existing organizations
    name: string, // Name of the organization
    domain: string, // Domain of the organization
}



/**
 * Custom hook for managing organization forms.
 * This hook provides methods for registering form fields, handling form submission, and managing errors.
 * It can be used to create or update organization information in the system.
 * @param {Object} params - The parameters for the hook.
 * @param {Function} params.onSuccess - Callback function to be called on successful form submission
 * @param {Organization} params.org - The organization object to be edited (optional)
 * @returns {Object} - Contains methods and states for managing the organization form
 * @property {Function} register - Method to register form fields with react-hook-form
 * @property {Function} handleSubmit - Method to handle form submission
 * @property {Object} errors - Object containing form validation errors
 * @property {Function} onSubmit - Method to handle form submission logic
 * @property {Function} setValue - Method to set form field values
 */
export const useFormOrg = ({ onSuccess, org }: { onSuccess: () => void, org?: Organization }) => {

    // useForm hook from react-hook-form to manage form state
    // It provides methods for registering form fields, handling form submission, and managing errors
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<InputOrg>()

    // State to manage loading state and error messages
    // The loading state is used to show a loading spinner while the create or update operation is being processed
    const [loading, setLoading] = useState(false)

    // The error state is used to show an error message if the operation fails
    // It can be a string or null if there is no error
    // The error message is set when the create or update operation fails
    const [error, setError] = useState<string | null>(null)


    // This hook is used to get the current organization from the store
    // It allows the component to access the current organization data
    const reset = () => {
        setValue('name', '')
        setValue('domain', '')
    }


    // useEffect hook to set initial values for the form fields when the component mounts
    // It sets the name and domain fields to the values of the organization if it exists
    useEffect(() => {

        if (org) {
            setValue('name', org.name)
            setValue('domain', org.domain)
        }
    }, [])


    // onSubmit function to handle form submission
    // It takes the form data as input and creates or updates the organization based on whether it is an existing organization or a new one
    // If the organization already exists, it updates the organization with the provided data
    const onSubmit = (data: InputOrg) => {

        // If the organization already exists, set the ID in the data object
        // This is necessary for the update operation to identify which organization to update
        if (org) {
            data.id = org.id
        }

        // Create a new organization object with the provided data
        // The name is converted to uppercase to ensure consistency in naming
        const organization: Organization = {
            ...data,
            name: (data.name).toUpperCase(),
        }

        // If the domain is not provided, set it to an empty string
        // This is to ensure that the domain field is always present in the organization object
        setLoading(true)

        // If the organization already exists, update it using the updateOrganizations function
        // If it does not exist, create a new organization using the createOrganizations function
        if (org) {

            // Update the organization using the updateOrganizations function
            // It returns a promise that resolves to a CreateUserResponse object
            updateOrganizations(organization).then((res: CreateUserResponse) => {
                console.log(res)
                // If the update is successful, set the loading state to false, clear the error state, and call the onSuccess callback
                setLoading(false)
                setError(null)
                // The onSuccess callback is used to perform any additional actions after the organization is created or updated
                onSuccess()
            }).catch((err: AxiosError) => {
                console.log(err)
                setLoading(false)
                setError((err.response?.data as CreateUserResponse).message.content[0])
            })
        } else {

            // Create a new organization using the createOrganizations function
            // It returns a promise that resolves to a CreateUserResponse object
            // The createOrganizations function is used to create a new organization in the system
            createOrganizations(organization).then((res: CreateUserResponse) => {
                console.log(res)
                // If the creation is successful, set the loading state to false, clear the error state, and call the onSuccess callback
                setLoading(false)
                setError(null)
                // The onSuccess callback is used to perform any additional actions after the organization is created
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
