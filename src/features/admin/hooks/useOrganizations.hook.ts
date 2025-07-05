import { User } from "@/shared/models/user.model"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { useLoadUsersStore } from "../store/load-users"
import toast from "react-hot-toast"
import { Organization } from "@/shared/models/organization.model"
import { deleteOrganizationApi, getOrganizations } from "../services/organizations.service"



export interface FetchProps {
    page: number // Current page number
    limit: number // Number of items per page
    search: string // Search term for filtering organizations
}


/**
 * Custom hook to manage organizations in an admin panel.
 * It provides functionality to fetch, delete, and paginate organizations.
 * 
 * @returns {Object} - Contains organizations, loading state, error messages, pagination controls, and search functionality.
 * * @property {Organization[]} organizations - List of organizations fetched from the API
 * * @property {boolean} isLoading - Indicates whether organizations are currently being fetched
 * * @property {string | null} error - Holds any error messages that occur during fetching or deleting organizations
 * * @property {number} page - Current page number for pagination
 * * @property {number} limit - Number of items to display per page
 * * @property {number} total - Total number of organizations fetched from the API
 * * @property {number} totalPages - Total number of pages based on the total number of organizations and the limit
 * * @property {Function} handlePageChange - Function to change the current page
 * * @property {Function} handleLimitChange - Function to change the number of items displayed per page
 * * @property {string} debouncedSearch - Debounced search term for filtering organizations
 * * @property {Function} setSearch - Function to set the search term
 * * @property {Function} setIsLoading - Function to set the loading state
 */

export const useOrganizations = () => {

    // State variables to manage organizations, loading state, error messages, search term, pagination, and debounced search
    // The organizations state holds the list of organizations fetched from the API
    const [organizations, setOrganizations] = useState<Organization[]>([])

    // The isLoading state indicates whether the organizations are currently being fetched
    const [isLoading, setIsLoading] = useState(true)

    // The error state holds any error messages that occur during the fetching or deleting of organizations
    const [error, setError] = useState<string | null>(null)

    // The search state holds the current search term entered by the user
    // It is used to filter the organizations based on the search term
    const [search, setSearch] = useState("")

    // Pagination states to manage the current page, limit of items per page, total number of items, and total number of pages
    // The page state holds the current page number
    const [page, setPage] = useState(1)

    // The limit state holds the number of items to display per page
    // It is used to control how many organizations are displayed in the list at once
    const [limit, setLimit] = useState(10)

    // The total state holds the total number of organizations fetched from the API
    // It is used to calculate the total number of pages for pagination
    const [total, setTotal] = useState(0)

    // The totalPages state holds the total number of pages based on the total number of organizations and the limit
    // It is used to determine how many pages of organizations are available for pagination
    const [totalPages, setTotalPages] = useState(0)

    // The debouncedSearch state holds the debounced value of the search term
    // It is used to delay the search operation until the user stops typing for a specified duration
    const [debouncedSearch] = useDebounce(search, 1000)

    // This function is used to load organizations when the component mounts or when the search term changes
    // It fetches the organizations from the API based on the current page, limit, and search term
    // It also sets the loading state to true while fetching and false when done
    const loadOrg = useLoadUsersStore((state: any) => state.load)
    const setLoadUsers = useLoadUsersStore((state: any) => state.setLoad)

    // This function fetches organizations from the API based on the provided fetchProps
    // It updates the organizations state with the fetched data, sets the total number of organizations,
    const fetchOrganizations = async (fetchProps: FetchProps) => {
        setIsLoading(true)
        try {
            const response = await getOrganizations({ page: fetchProps.page, limit: fetchProps.limit, search: fetchProps.search, })


            setOrganizations(response.data.records)
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

    // This function deletes an organization by its ID
    // It calls the deleteOrganizationApi function with the organization ID and then fetches the updated
    const deleteOrganization = async (orgId: number) => {
        try {
            deleteOrganizationApi(orgId).then(() => {
                fetchOrganizations(
                    { page, limit, search: debouncedSearch }
                )
            }).catch((error) => {
                setError(error as string)
                toast.error("Error al eliminar la organización")
            })
        } catch (error) {
            setError(error as string)
            console.log(error)
        }
    }


    // This effect runs when the component mounts or when the loadOrg state changes
    // It fetches the organizations based on the current page, limit, and search term
    useEffect(() => {

        if (loadOrg) {
            fetchOrganizations(
                { page, limit, search: debouncedSearch }
            )
        }

    }, [loadOrg])


    // This effect runs when the debouncedSearch state changes
    // It fetches the organizations based on the current page, limit, and debounced search
    useEffect(() => {
        fetchOrganizations(
            { page, limit, search: debouncedSearch }
        )
    }, [debouncedSearch,])


    // This effect runs when the page or limit state changes
    // It fetches the organizations based on the updated page, limit, and search term
    const handlePageChange = (pageIn: number) => {
        setPage(pageIn)
        fetchOrganizations(
            { page: pageIn, limit, search: debouncedSearch }
        )
    }

    // This function handles the change in the limit of items per page
    // It updates the limit state and fetches the organizations based on the new limit, current page, and search term
    // It is called when the user changes the number of items to display per page
    const handleLimitChange = (limitIn: number) => {
        setLimit(limitIn)
        fetchOrganizations(
            { page, limit: limitIn, search: debouncedSearch }

        )
    }




    return { organizations, isLoading, error, page, limit, total, totalPages, handlePageChange, handleLimitChange, debouncedSearch, setSearch, setIsLoading, deleteOrganization }
}

