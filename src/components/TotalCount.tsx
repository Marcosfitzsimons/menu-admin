import { TotalCountCardProps } from "@/lib/types/props";

const TotalCountCard = ({ icon, title, value }: TotalCountCardProps) => {
  return (
    <article className="flex items-center gap-4 bg-card py-2 px-4 border shadow-input rounded-lg dark:shadow-none">
      <div className="">{icon}</div>
      <div className="flex flex-col">
        <h4 className="text-card-foreground">{title}</h4>
        <p className="text-lg font-bold flex items-center gap-1">{value}</p>
      </div>
    </article>
  );
};

export default TotalCountCard;
