export type AccountType = 'individual' | 'business'

export interface UserProfile {
  id: string
  email: string
  name: string
  account_type: AccountType
  business_id?: string | null
  created_at: string
  updated_at: string
}

export interface Business {
  id: string
  name: string
  created_at: string
  updated_at: string
}
