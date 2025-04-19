export const validateCategory = (categories: string[], newCategory: string) => {
    if (categories.includes(newCategory)) return false;
    return true;
}
