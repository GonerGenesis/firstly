import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const tw = (...inputs) => twMerge(clsx(...inputs));
