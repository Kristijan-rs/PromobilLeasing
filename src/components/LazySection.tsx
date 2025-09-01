import { useInView } from "react-intersection-observer";

type Props = {
  children: React.ReactNode;
  rootMargin?: string; 
  once?: boolean;
  className?: string;
};

export default function LazySection({
  children,
  rootMargin = "200px",
  once = true,
  className,
}: Props) {
  const { ref, inView } = useInView({ rootMargin, triggerOnce: once });
  return (
    <div ref={ref} className={className}>
      {inView ? children : null}
    </div>
  );
}
