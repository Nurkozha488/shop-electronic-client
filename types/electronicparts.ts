export interface IElectronicPart {
    id: number
    electronic_manufacturer: string
    price: number
    parts_manufacturer: string
    vendor_code: string
    name: string
    description: string
    images: string
    in_stock: number
    bestseller: boolean
    new: boolean
    popularity: number
    compatibility: string
  }
  
  export interface IElectronicParts {
    count: number
    rows: IElectronicPart[]
  }