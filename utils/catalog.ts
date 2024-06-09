import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender, idGenerator } from './common'
import { getElectronicPartsFx } from '@/app/api/electronicParts'
import { setFilteredElectronicParts } from '@/context/electronicParts'

const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
})

export const electronicManufacturers = [ 
'Samsung',
'Iphone',
'LG',
'Huawei',
'OnePlus',
'POCO',
'Realme',
'Xiaomi',
'Nokia',
].map(createManufacturerCheckboxObj)

export const partsManufacturers = [
  'Screen',
  'Glass',
  'Camera',
  'Film',
  'Skin',
  'Sensor',
  'Lesly',
  'Radian',
  'Case',
  'Headphones',
].map(createManufacturerCheckboxObj)

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string
  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string
  const electronicQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('electronic', router) as string)
  )
  const partsQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string)
  )
  const isValidElectronicQuery =
    Array.isArray(electronicQueryValue) && !!electronicQueryValue?.length
  const isValidPartsQuery =
    Array.isArray(partsQueryValue) && !!partsQueryValue?.length
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidElectronicQuery,
    isValidPartsQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    electronicQueryValue,
    partsQueryValue,
  }
}

export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string
) => {
  callback()

  const data = await getElectronicPartsFx(`/electronic-parts?limit=20&offset=${path}`)

  setFilteredElectronicParts(data)
}

export async function updateParamsAndFilters<T>(
  updatedParams: T,
  path: string,
  router: NextRouter
) {
  const params = router.query

  delete params.electronic
  delete params.parts
  delete params.priceFrom
  delete params.priceTo

  router.push(
    {
      query: {
        ...params,
        ...updatedParams,
      },
    },
    undefined,
    { shallow: true }
  )

  const data = await getElectronicPartsFx(`/electronic-parts?limit=20&offset=${path}`)

  setFilteredElectronicParts(data)
}