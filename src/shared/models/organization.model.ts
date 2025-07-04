export interface Organization {
    id?: number
    name: string
    domain: string
    adminId?: number
}


export interface OrgHeaderResponse {
    success: boolean
    message: {
        content: string[]
        displayable: boolean
    }
    data: {
        records: Organization[]

        total: number
        limit: number
        page: number
        pages: number
    }

}


export interface CreateOrgResponse {
    success: boolean
    message: {
        content: string[]
        displayable: boolean
    },
    data: unknown
}
