interface Option {
  id: string;
  label: string;
}

export const optionsGenerator = (
  categoryOptions: Array<{
    _id: string;
    title: string;
    category_slug: string;
  }>
): Option[] => {
  return categoryOptions.map((item) => ({
    id: item._id,
    label: item.title,
  }));
};
