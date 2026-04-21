type Item = {
  name: string;
  value?: string | number;
};

const DescriptionList = ({ items }: { items: Item[] }) => {
  return (
    <dl className="space-y-8">
      {items.map(({ name, value }) => (
        <div key={name}>
          <dt className="text-muted-foreground text-xs font-bold mb-1">
            {name}
          </dt>
          <dd className="text-foreground"> {value}</dd>
        </div>
      ))}
    </dl>
  );
};

export default DescriptionList;
