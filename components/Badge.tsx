export interface BadgeProps {
  title: string;
  className?: string;
}
export const Badge = ({ title, className = "" }: BadgeProps) => {
  return <span className={`badge mt-1 me-2 ${className}`}>{title}</span>;
};
