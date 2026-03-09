import { useLayoutTheme } from "../../shared/layout/ThemeContext";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const theme = useLayoutTheme();
  return (
    <div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: theme.pageTitleColor }}>{title}</h1>
      <p className="text-sm sm:text-base mt-1" style={{ color: theme.pageSubtitleColor }}>{subtitle}</p>
    </div>
  );
}
