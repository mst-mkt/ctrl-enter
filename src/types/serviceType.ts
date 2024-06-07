import type { SERVICES, SERVICE_URLS } from '~/constants/services'

export type Services = (typeof SERVICES)[number]

export type Wildcards = (typeof SERVICE_URLS)[Services][number]
