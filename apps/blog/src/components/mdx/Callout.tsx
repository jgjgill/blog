import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Callout({ children }: Props) {
  return (
    <aside
      style={{
        borderLeft: '3px solid #e5e7eb',
        padding: '0.75rem 1rem',
        margin: '1.25rem 0',
        backgroundColor: '#f9fafb',
        borderRadius: '0 0.375rem 0.375rem 0',
        fontSize: '0.9375rem',
      }}
    >
      {children}
    </aside>
  );
}
