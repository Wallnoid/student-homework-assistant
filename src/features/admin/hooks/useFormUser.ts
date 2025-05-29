import { CreateUserResponse, Role, User } from "@/shared/models/user.model"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createMembers, updateMember } from "../services/members.service"
import { AxiosError } from "axios"


type InputUser = {
    id?: number
    name: string
    lastName: string
    email: string
    password: string
    role: Role
    organizationId: number
}



export const useFormUser = ({ onSuccess, student }: { onSuccess: () => void, student?: User }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<InputUser>()

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState<string | null>(null)

    const reset = () => {
        setValue('name', '')
        setValue('lastName', '')
        setValue('email', '')
        setValue('password', '')
        setValue('role', Role.USER)
    }


    useEffect(() => {
        setValue('role', Role.USER)

        if (student) {
            setValue('name', student.name)
            setValue('lastName', student.lastName)
            setValue('email', student.email)
            setValue('role', student.role!)
        }
    }, [])


    const onSubmit = (data: InputUser) => {

        if (student) {
            data.id = student.id
        }

        const user = {
            ...data,
            organizationId: 1,
            name: (data.name).toUpperCase(),
            lastName: (data.lastName).toUpperCase(),
            password: data.email
        }

        setLoading(true)

        if (student) {
            updateMember(user).then((res: CreateUserResponse) => {
                console.log(res)
                setLoading(false)
                setError(null)
                onSuccess()
            }).catch((err: AxiosError) => {
                console.log(err)
                setLoading(false)
                setError((err.response?.data as CreateUserResponse).message.content[0])
            })
        } else {

            createMembers(user).then((res: CreateUserResponse) => {
                console.log(res)
                setLoading(false)
                setError(null)
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
