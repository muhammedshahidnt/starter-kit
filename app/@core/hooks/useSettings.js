import { useContext } from 'react'
import { SettingsContext } from '@/app/@core/context/settingsContext'
// import { SettingsContext } from 'src/@core/context/settingsContext'

export const useSettings = () => useContext(SettingsContext)
