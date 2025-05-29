import { User } from "@/shared/models/user.model"
import { useEffect, useState } from "react"
import { getMembers } from "../services/members-service"
import { useDebounce } from "use-debounce"
import { useLoadUsersStore } from "../store/load-users"






export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [total, setTotal] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [debouncedSearch] = useDebounce(search, 500)

    const loadUsers = useLoadUsersStore((state: any) => state.load)
    const setLoadUsers = useLoadUsersStore((state: any) => state.setLoad)

    const fetchUsers = async () => {
        setIsLoading(true)
        try {
            const response = await getMembers({ page, limit, search: debouncedSearch })
            console.log(response)

            setUsers(response.data.records)
            setTotal(response.data.total)
            setTotalPages(response.data.pages)
            setLimit(response.data.limit)
            setPage(response.data.page)

        } catch (error) {
            setError(error as string)
            console.log(error)

        } finally {
            setIsLoading(false)
            setLoadUsers(false)
        }
    }

    useEffect(() => {
        console.log(debouncedSearch)

        if (loadUsers) {
            fetchUsers()
        }

    }, [debouncedSearch, loadUsers])


    const handlePageChange = (page: number) => {
        setPage(page)
        fetchUsers()
    }

    const handleLimitChange = (limit: number) => {
        setLimit(limit)
        fetchUsers()
    }




    return { users, isLoading, error, page, limit, total, totalPages, handlePageChange, handleLimitChange, debouncedSearch, setSearch, setIsLoading }
}

