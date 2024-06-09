import { IElectronicPart } from '@/types/electronicparts'
import { createDomain } from 'effector-next'

const electronicPart = createDomain()

export const setElectronicPart = electronicPart.createEvent<IElectronicPart>()

export const $electronicPart = electronicPart
  .createStore<IElectronicPart>({} as IElectronicPart)
  .on(setElectronicPart, (_, part) => part)