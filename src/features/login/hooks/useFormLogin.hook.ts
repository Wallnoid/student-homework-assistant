import { useState } from "react"
import { useForm } from "react-hook-form"
import { loginService } from "../services/auth.service"
import { useRouter } from "next/navigation"
import { setToken, setUser } from "@/shared/utils/localStorage.utils"
import { LoginResponse } from "@/shared/models/auth.model"
import toast from "react-hot-toast"


type InputUser = {
    email: string
    password: string
}

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
                setUser(res.data.user)
                toast.success(res.message.content[0])
                router.push('/')
            } else {
                setLoading(false)
                setError(res.message.content[0])

                toast.error(res.message.content[0])
            }

        })
    }

    return { register, handleSubmit, formState: { errors }, loading, error, onSubmit }
}





