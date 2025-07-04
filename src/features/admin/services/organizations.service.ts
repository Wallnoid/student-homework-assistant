import { CreateOrgResponse, Organization, OrgHeaderResponse } from "@/shared/models/organization.model"
import { CreateUserResponse, User, UserHeaderResponse } from "@/shared/models/user.model"
import interceptor from "@/shared/services/interceptor"


const API_URL = process.env.NEXT_PUBLIC_API_URL


// Function to get organizations with pagination and search functionality
// It takes page number, limit of items per page, and search term as parameters
export const getOrganizations = async ({ page, limit, search }: { page: number, limit: number, search: string }): Promise<OrgHeaderResponse> => {

    const response = await interceptor.get(`${API_URL}/organizations`, { params: { page, limit, search } })
    return response.data
}


// Function to get a specific organization by its ID
// It takes the organization ID as a parameter and returns an Organization object
export const createOrganizations = async (organization: Organization): Promise<CreateOrgResponse> => {
    const response = await interceptor.post(`${API_URL}/organizations`, organization)
    return response.data
}


// Function to update an existing organization
// It takes an Organization object as a parameter, excluding the ID, and returns a CreateOrgResponse
// The ID is extracted from the organization object and used in the API endpoint
export const updateOrganizations = async (org: Organization): Promise<CreateOrgResponse> => {
    const orgId = org.id
    delete org.id
    const response = await interceptor.patch(`${API_URL}/organizations/${orgId}`, org)
    return response.data
}


// Function to delete an organization by its ID
// It takes the organization ID as a parameter and returns a Promise that resolves to void
export const deleteOrganizationApi = async (orgId: number): Promise<void> => {
    const response = await interceptor.delete(`${API_URL}/organizations/${orgId}`)
    return response.data
}


