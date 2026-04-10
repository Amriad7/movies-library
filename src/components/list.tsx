import React from "react";

type Item = {
  name: string;
  value?: string | number;
};

const List = ({ items }: { items: Item[] }) => {
  return (
    <ul className="space-y-8">
      {items.map(({ name, value }) => (
        <li key={name}>
          <h6 className="text-muted-foreground text-xs font-bold mb-1">
            {name}
          </h6>
          <p className="text-foreground"> {value}</p>
        </li>
      ))}
    </ul>
  );
};

export default List;
