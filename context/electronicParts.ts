import { IElectronicParts } from '@/types/electronicparts'
import { IFilterCheckboxItem } from '@/types/catalog'
import { electronicManufacturers, partsManufacturers } from '@/utils/catalog'
import { createDomain } from 'effector-next'

const electronicParts = createDomain()

export const setElectronicParts = electronicParts.createEvent<IElectronicParts>()
export const setElectronicPartsCheapFirst = electronicParts.createEvent()
export const setElectronicPartsExpensiveFirst = electronicParts.createEvent()
export const setElectronicPartsByPopularity = electronicParts.createEvent()
export const setFilteredElectronicParts = electronicParts.createEvent()
export const setElectronicManufacturers =
electronicParts.createEvent<IFilterCheckboxItem[]>()
export const updateElectronicManufacturer =
electronicParts.createEvent<IFilterCheckboxItem>()
export const setPartsManufacturers =
electronicParts.createEvent<IFilterCheckboxItem[]>()
export const updatePartsManufacturer =
electronicParts.createEvent<IFilterCheckboxItem>()
export const setElectronicManufacturersFromQuery =
electronicParts.createEvent<string[]>()
export const setPartsManufacturersFromQuery =
electronicParts.createEvent<string[]>()

const updateManufacturer = (
  manufacturers: IFilterCheckboxItem[],
  id: string,
  payload: Partial<IFilterCheckboxItem>
) =>
  manufacturers.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...payload,
      }
    }

    return item
  })

const updateManufacturerFromQuery = (
  manufacturers: IFilterCheckboxItem[],
  manufacturersFromQuery: string[]
) =>
  manufacturers.map((item) => {
    if (manufacturersFromQuery.find((title) => title === item.title)) {
      return {
        ...item,
        checked: true,
      }
    }

    return item
  })

export const $electronicParts = electronicParts
  .createStore<IElectronicParts>({} as IElectronicParts)
  .on(setElectronicParts, (_, parts) => parts)
  .on(setElectronicPartsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price),
  }))
  .on(setElectronicPartsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price),
  }))
  .on(setElectronicPartsByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.popularity - a.popularity),
  }))

export const $electronicManufacturers = electronicParts
  .createStore<IFilterCheckboxItem[]>(
    electronicManufacturers as IFilterCheckboxItem[]
  )
  .on(setElectronicManufacturers, (_, parts) => parts)
  .on(updateElectronicManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setElectronicManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

export const $partsManufacturers = electronicParts
  .createStore<IFilterCheckboxItem[]>(
    partsManufacturers as IFilterCheckboxItem[]
  )
  .on(setPartsManufacturers, (_, parts) => parts)
  .on(updatePartsManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setPartsManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

export const $filteredElectronicParts = electronicParts
  .createStore<IElectronicParts>({} as IElectronicParts)
  .on(setFilteredElectronicParts, (_, parts) => parts)