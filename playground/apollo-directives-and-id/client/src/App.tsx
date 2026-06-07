import { useState } from 'react';
import { Directives } from './experiments/Directives';
import { CustomDirective } from './experiments/CustomDirective';
import { CacheCollision } from './experiments/CacheCollision';
import { ConnectionFix } from './experiments/ConnectionFix';

const EXPERIMENTS = [
  { key: 'directives', label: '실험 1 — built-in directives', Comp: Directives },
  { key: 'custom', label: '실험 2 — custom @uppercase', Comp: CustomDirective },
  { key: 'collision', label: '실험 3 — 캐시 덮어쓰기', Comp: CacheCollision },
  { key: 'connection', label: '실험 4 — @connection 해결', Comp: ConnectionFix },
] as const;

export function App() {
  const [active, setActive] = useState<string>(EXPERIMENTS[0].key);
  const Current = EXPERIMENTS.find((e) => e.key === active)!.Comp;

  return (
    <main>
      <h1>Apollo directives & ID playground</h1>
      <p>
        Apollo Devtools 의 <strong>Cache</strong> 탭을 열어두고 각 실험을 돌리세요.
        캐시 칸이 어떻게 잡히는지가 핵심입니다.
      </p>
      <nav>
        {EXPERIMENTS.map((e) => (
          <button
            key={e.key}
            className={e.key === active ? 'active' : ''}
            onClick={() => setActive(e.key)}
          >
            {e.label}
          </button>
        ))}
      </nav>
      <Current />
    </main>
  );
}
