import { IElectronicPart } from './electronicparts'

export interface IDashboardSlider {
  items: IElectronicPart[]
  spinner: boolean
  goToPartPage?: boolean
}

export interface ICartAlertProps {
  count: number
  closeAlert: VoidFunction
}