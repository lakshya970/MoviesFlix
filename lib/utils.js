export const formatDate = (date) => {
  return Intl.DateTimeFormat("en-Us", { dateStyle: "medium" }).format(
    new Date(date)
  );
};
