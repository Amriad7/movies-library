import { LucideIcon } from "lucide-react";

const Tag = ({
  Icon,
  children,
}: {
  Icon: LucideIcon;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-2 text-sm ">
      <Icon className="text-sidebar-primary-foreground fill-transparent size-5" />
      {children}
    </div>
  );
};

export default Tag;
