import { useState } from "react"
import { useForm } from "react-hook-form"
import { loginService } from "../services/auth.service"
import { useRouter } from "next/navigation"
import { setToken } from "@/shared/utils/localStorage.utils"
import { LoginResponse } from "@/shared/models/auth.model"
import toast from "react-hot-toast"


type InputUser = {
    email: string
    password: string
}

/**
 * Custom hook for handling the login form.
 * It uses react-hook-form for form management and validation.
 * It provides methods to handle form submission, loading state, and error handling.
 * 
 * @returns {Object} - Contains form methods, loading state, error message, and submit handler.
 * * @property {Function} register - Method to register form fields
 * * @property {Function} handleSubmit - Method to handle form submission
 * * @property {Object} formState - Contains form state including errors
 * * @property {boolean} loading - Indicates whether the form is currently submitting
 * * @property {string | null} error - Holds any error messages that occur during submission
 * * @property {Function} onSubmit - Function to handle form submission with user data
 */
export const useFormLogin = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<InputUser>()

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState<string | null>(null)

    const onSubmit = (data: InputUser) => {
        setLoading(true)
        loginService(data.email, data.password).then((res: LoginResponse) => {

            if (res.success) {
                setLoading(false)
                setError(null)
                setToken(res.data.token)
                toast.success(res.message.content[0])
                router.push('/')
            } else {
                setLoading(false)
                setError(res.message.content[0])

                toast.error(res.message.content[0])
            }

        })
            .catch((err) => {
                console.error(err)
                setLoading(false)
                setError(err.response?.data?.message?.content[0] || 'Error al iniciar sesión')
                toast.error(err.response?.data?.message?.content[0] || 'Error al iniciar sesión')
            })

    }

    return { register, handleSubmit, formState: { errors }, loading, error, onSubmit }
}





