import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Filters out browser-generated attributes that cause hydration mismatches
 * This is particularly useful for form elements and buttons
 */
export function filterHydrationProps(props: Record<string, any>) {
  const {
    fdprocessedid,
    _reactProps$,
    __reactProps$,
    ...cleanProps
  } = props
  
  return cleanProps
}
