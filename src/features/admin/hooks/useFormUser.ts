import { CreateUserResponse, Role } from "@/shared/models/user.model"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createMembers } from "../services/members-service"
import { AxiosError } from "axios"


type InputUser = {
    name: string
    lastName: string
    email: string
    password: string
    role: Role
    organizationId: number
}



export const useFormUser = ({ onSuccess }: { onSuccess: () => void }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<InputUser>()

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState<string | null>(null)

    const reset = () => {
        console.log('reset')
        setValue('name', '')
        setValue('lastName', '')
        setValue('email', '')
        setValue('password', '')
        setValue('role', Role.USER)
    }


    useEffect(() => {
        setValue('role', Role.USER)
    }, [])


    const onSubmit = (data: InputUser) => {

        const user = {
            ...data,
            organizationId: 1,
            name: (data.name).toUpperCase(),
            lastName: (data.lastName).toUpperCase(),
            password: data.email
        }

        setLoading(true)

        createMembers(user).then((res: CreateUserResponse) => {
            console.log(res)
            setLoading(false)
            setError(null)
            onSuccess()
        }).catch((err: AxiosError) => {
            console.log(err)
            setLoading(false)
            onSuccess()


            setError((err.response?.data as CreateUserResponse).message.content[0])
        })



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
