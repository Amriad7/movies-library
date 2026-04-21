const ListPlaceholder = ({
  list,
  placeholder,
  children,
}: {
  list: any[] | any;
  placeholder: React.ReactNode;
  children?: React.ReactNode;
}) => {
  if (list && list.length > 0) {
    return children;
  }

  if (typeof placeholder === "string") {
    return <p className="text-muted-foreground text-center">{placeholder}</p>;
  }

  return placeholder;
};

export default ListPlaceholder;
