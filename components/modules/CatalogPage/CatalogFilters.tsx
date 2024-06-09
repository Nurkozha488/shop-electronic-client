import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFiltersProps } from '@/types/catalog'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  $electronicManufacturers,
  $partsManufacturers,
  setElectronicManufacturersFromQuery,
  setPartsManufacturersFromQuery,
} from '@/context/electronicParts'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { getQueryParamOnFirstRender } from '@/utils/common'
import CatalogFiltersMobile from './CatalogFiltersMobile'
import {
  checkQueryParams,
  updateParamsAndFilters,
  updateParamsAndFiltersFromQuery,
} from '@/utils/catalog'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
  closePopup,
  filtersMobileOpen,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)
  const electronicManufacturers = useStore($electronicManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const router = useRouter()

  useEffect(() => {
    applyFiltersFromQuery()
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const {
        isValidElectronicQuery,
        isValidPartsQuery,
        isValidPriceQuery,
        partsQueryValue,
        priceFromQueryValue,
        electronicQueryValue,
        priceToQueryValue,
      } = checkQueryParams(router)

      const electronicQuery = `&electronic=${getQueryParamOnFirstRender(
        'electronic',
        router
      )}`
      const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidElectronicQuery && isValidPartsQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setElectronicManufacturersFromQuery(electronicQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${electronicQuery}${partsQuery}`)
        return
      }

      if (isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
        }, `${currentPage}${priceQuery}`)
      }

      if (isValidElectronicQuery && isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setElectronicManufacturersFromQuery(electronicQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${electronicQuery}${partsQuery}`)
        return
      }

      if (isValidElectronicQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setElectronicManufacturersFromQuery(electronicQueryValue)
        }, `${currentPage}${electronicQuery}`)
      }

      if (isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${partsQuery}`)
      }

      if (isValidPartsQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${partsQuery}`)
      }

      if (isValidElectronicQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setElectronicManufacturersFromQuery(electronicQueryValue)
        }, `${currentPage}${priceQuery}${electronicQuery}`)
      }
    } catch (error) {
      const err = error as Error

      if (err.message === 'URI malformed') {
        toast.warning('Неправильный url для фильтров')
        return
      }

      toast.error(err.message)
    }
  }

  const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
    setIsFilterInQuery(true)
    setPriceRange([+priceFrom, +priceTo])
    setIsPriceRangeChanged(true)
  }

  const applyFilters = async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''
      const electronics = electronicManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const parts = partsManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const encodedElectronicQuery = encodeURIComponent(JSON.stringify(electronics))
      const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts))
      const electronicQuery = `&electronic=${encodedElectronicQuery}`
      const partsQuery = `&parts=${encodedPartsQuery}`
      const initialPage = currentPage > 0 ? 0 : currentPage

      if (electronics.length && parts.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            electronic: encodedElectronicQuery,
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${electronicQuery}${partsQuery}`,
          router
        )
        return
      }

      if (isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}`,
          router
        )
      }

      if (electronics.length && parts.length) {
        updateParamsAndFilters(
          {
            electronic: encodedElectronicQuery,
            parts: encodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${electronicQuery}${partsQuery}`,
          router
        )
        return
      }

      if (electronics.length) {
        updateParamsAndFilters(
          {
            electronic: encodedElectronicQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${electronicQuery}`,
          router
        )
      }

      if (parts.length) {
        updateParamsAndFilters(
          {
            parts: encodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${partsQuery}`,
          router
        )
      }

      if (electronics.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            electronic: encodedElectronicQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${electronicQuery}${priceQuery}`,
          router
        )
      }

      if (parts.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${partsQuery}${priceQuery}`,
          router
        )
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <>
      {isMobile ? (
        <CatalogFiltersMobile
          closePopup={closePopup}
          spinner={spinner}
          applyFilters={applyFilters}
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          filtersMobileOpen={filtersMobileOpen}
        />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters