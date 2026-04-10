const Heading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <header className="flex items-baseline gap-2">
      <h3 className="text-2xl font-bold ">{title}</h3>
      <span className="text-base text-muted-foreground">{description}</span>
    </header>
  );
};

export default Heading;
