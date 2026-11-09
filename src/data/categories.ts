import { PROJECT_CATEGORIES } from '@/types/social';

export const CATEGORY_FILTERS = ['All', ...PROJECT_CATEGORIES] as const;

export type CategoryFilterValue = (typeof CATEGORY_FILTERS)[number];
