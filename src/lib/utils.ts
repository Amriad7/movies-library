import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min);
}

export function getYear(date: string) {
  return (date || "").split("-").at(0) || "";
}

export const getLanguageName = new Intl.DisplayNames(["en"], {
  type: "language",
});

export const searchParamsToString = (params: object) => {
  return `?${Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")}`;
};
