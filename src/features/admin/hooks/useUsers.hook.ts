import { User } from "@/shared/models/user.model"
import { useEffect, useState } from "react"
import { deleteMember, getMembers } from "../services/members.service"
import { useDebounce } from "use-debounce"
import { useLoadUsersStore } from "../store/load-users"
import toast from "react-hot-toast"
import { getUserLocal } from "@/shared/utils/localStorage.utils"



export interface FetchProps {
    page: number // Current page number
    limit: number // Number of items per page
    search: string // Search term for filtering users
}


/**
 * Custom hook to manage users in an admin panel.
 * It provides functionality to fetch, delete, and paginate users.
 * 
 * @returns {Object} - Contains users, loading state, error messages, pagination controls, and search functionality.
 * * @property {User[]} users - List of users fetched from the API
 * * @property {boolean} isLoading - Indicates whether users are currently being fetched
 * * @property {string | null} error - Holds any error messages that occur during fetching or deleting users
 * * @property {number} page - Current page number for pagination
 * * @property {number} limit - Number of items to display per page
 * * @property {number} total - Total number of users fetched from the API
 * * @property {number} totalPages - Total number of pages based on the total number of users and the limit
 * * @property {Function} handlePageChange - Function to change the current page
 * * @property {Function} handleLimitChange - Function to change the number of items displayed per page
 * * @property {string} debouncedSearch - Debounced search term for filtering users
 * * @property {Function} setSearch - Function to set the search term
 * * @property {Function} setIsLoading - Function to set the loading state
 */
export const useUsers = (defaultLimit?: number) => {
    // State variables to manage users, loading state, error messages, search term, pagination, and debounced search
    // The users state holds the list of users fetched from the API
    const [users, setUsers] = useState<User[]>([])

    // The isLoading state indicates whether the users are currently being fetched
    // It is used to show a loading spinner while the data is being fetched
    const [isLoading, setIsLoading] = useState(true)

    // The error state holds any error messages that occur during the fetching or deleting of users
    // It is used to display error messages to the user if something goes wrong
    const [error, setError] = useState<string | null>(null)

    // The search state holds the current search term entered by the user
    // It is used to filter the users based on the search term
    const [search, setSearch] = useState("")

    // Pagination states to manage the current page, limit of items per page, total number of items, and total number of pages
    // The page state holds the current page number
    const [page, setPage] = useState(1)

    // The limit state holds the number of items to display per page
    // It is used to control how many users are displayed in the list at once
    const [limit, setLimit] = useState(defaultLimit || 10) // Default limit is set to 10 if not provided

    // The total state holds the total number of users fetched from the API
    // It is used to calculate the total number of pages for pagination
    const [total, setTotal] = useState(0)

    // The totalPages state holds the total number of pages based on the total number of users and the limit
    // It is used to determine how many pages of users are available for pagination
    const [totalPages, setTotalPages] = useState(0)
    const [debouncedSearch] = useDebounce(search, 1000)

    // This function is used to load users when the component mounts or when the search term changes
    // It fetches the users from the API based on the current page, limit, and search term
    // It also sets the loading state to true while fetching and false when done
    const loadUsers = useLoadUsersStore((state: any) => state.load)
    const setLoadUsers = useLoadUsersStore((state: any) => state.setLoad)



    // Function to fetch users from the API
    // It takes the FetchProps object as an argument, which contains the current page, limit, and search term
    // It updates the users state with the fetched data and handles pagination
    const fetchUsers = async (fetchProps: FetchProps) => {
        setIsLoading(true)
        const userLocal = getUserLocal()
        const organizationId = userLocal?.organization?.id

        try {
            const response = await getMembers({ page: fetchProps.page, limit: fetchProps.limit, search: fetchProps.search, organizationId: organizationId === 1 ? undefined : organizationId })
            console.log(response)

            const filteredRecords = response.data.records.filter((user: User) => user.id !== userLocal?.id)

            setUsers(filteredRecords)
            setTotal(response.data.total)
            setTotalPages(response.data.pages)

        } catch (error) {
            setError(error as string)
            console.log(error)

        } finally {
            setIsLoading(false)
            setLoadUsers(false)
        }
    }

    // Function to delete a user by their ID
    // It calls the deleteMember service and updates the users list after deletion
    const deleteUser = async (userId: number) => {
        try {
            deleteMember(userId).then(() => {
                fetchUsers(
                    { page, limit, search: debouncedSearch }

                )
            }).catch((error) => {
                setError(error as string)
                console.log(error)
                toast.error("Error al eliminar el usuario")
            })
        } catch (error) {
            setError(error as string)
            console.log(error)
        }
    }


    // useEffect hook to fetch users when the component mounts or when the loadUsers state changes
    // It calls the fetchUsers function with the current page, limit, and debounced search
    useEffect(() => {


        if (loadUsers) {
            fetchUsers(
                { page, limit, search: debouncedSearch }
            )
        }

    }, [loadUsers])


    // useEffect hook to fetch users when the debouncedSearch state changes
    // It calls the fetchUsers function with the current page, limit, and debounced search
    useEffect(() => {
        console.log(debouncedSearch)
        fetchUsers(
            { page, limit, search: debouncedSearch }
        )

    }, [debouncedSearch,])


    // useEffect hook to fetch users when the page or limit state changes
    // It calls the fetchUsers function with the current page, limit, and debounced search
    const handlePageChange = (pageIn: number) => {
        console.log("handlePageChange", page)

        setPage(pageIn)

        fetchUsers(
            {
                page: pageIn,
                limit,
                search: debouncedSearch

            }
        )
    }


    // Function to handle limit changes
    // It updates the limit state and fetches users with the new limit
    const handleLimitChange = (limitIn: number) => {
        setLimit(limitIn)
        fetchUsers(
            {
                page,
                limit: limitIn,
                search: debouncedSearch
            }
        )
    }




    return { users, isLoading, error, page, limit, total, totalPages, handlePageChange, handleLimitChange, debouncedSearch, setSearch, setIsLoading, deleteUser }
}

