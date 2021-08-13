export interface BadgeProps {
  title: string;
  className?: string;
}
export const Badge = ({ title, className = "" }: BadgeProps) => {
  return <span className={`badge bg-success ${className}`}>{title}</span>;
};
