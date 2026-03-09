import { layoutTheme } from "../../shared/layout/layoutTheme";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: layoutTheme.pageTitleColor }}>{title}</h1>
      <p className="text-sm sm:text-base mt-1" style={{ color: layoutTheme.pageSubtitleColor }}>{subtitle}</p>
    </div>
  );
}
