import { faker } from "@faker-js/faker"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateArray = <T>(getNext: () => T, minCount: number, maxCount: number) => {
  const count = faker.number.int({ min: minCount, max: maxCount })
  const r: T[] = []
  for (let i = 0; i < count; i++) r.push(getNext())
  return r
}

export const validURL = (str: string) => {
  var pattern = new RegExp(/^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/)
  return !!pattern.test(str)
}

export const containsOnlyDigits = (str: string) => {
  for (let index = 0; index < str.length; index++) {
    const c = str[index]
    assertIsNonNil(c)
    if (isNaN(parseInt(c))) return false
  }
  return true
}

export function assertIsNonNil<T>(val: T): asserts val is NonNullable<T> {
  if (val === null || val === undefined) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`)
  }
}

export function asNonNil<T>(val?: T) {
  assertIsNonNil(val)
  return val
}

export const eva = <T>(f: () => T) => f()
