import categories from './data/categories.json';
import flyers from './data/flyers.json';
import retailers from './data/retailers.json';

export const getRetailers = () => retailers.data;

export const getFlyers = () => flyers.data;

export const getCategories = () => categories.data;