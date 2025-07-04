

import { create } from 'zustand'
import { Organization } from '../models/organization.model'

export const useCurrentOrganizationStore = create((set) => ({
    org: {},
    setOrg: (org: Organization) => set({ org }),
}))
