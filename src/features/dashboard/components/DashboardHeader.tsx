interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-100">{title}</h1>
      <p className="text-zinc-200 mt-1">{subtitle}</p>
    </div>
  );
}
