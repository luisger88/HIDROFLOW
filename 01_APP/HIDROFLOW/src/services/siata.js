
import { apiGet } from './apiClient'
export const siata = { getEstaciones: ()=>apiGet('siata/estaciones') }
