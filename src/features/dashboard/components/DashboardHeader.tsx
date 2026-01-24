interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-200">{title}</h1>
      <p className="text-sm sm:text-base text-zinc-400 mt-1">{subtitle}</p>
    </div>
  );
}
