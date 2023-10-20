import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==================================================
export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const secondsDiff = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  if (secondsDiff < 60) {
    return `${secondsDiff} seconds ago`;
  }

  const minutesDiff = Math.floor(secondsDiff / 60);
  if (minutesDiff < 60) {
    return `${minutesDiff} minutes ago`;
  }

  const hoursDiff = Math.floor(minutesDiff / 60);
  if (hoursDiff < 24) {
    return `${hoursDiff} hours ago`;
  }

  const daysDiff = Math.floor(hoursDiff / 24);
  return `${daysDiff} days ago`;
};
// ==================================================

export const abbreviateNumber = (value: number): string => {
  if (value === undefined) {
    return "0";
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toString();
};
