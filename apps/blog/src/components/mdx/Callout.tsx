import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Callout({ children }: Props) {
  return <aside className="callout">{children}</aside>;
}
