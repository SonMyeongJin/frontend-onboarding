import { css } from '@linaria/atomic';
import { cx } from '@linaria/core';
import type { FC } from 'react';
import { useMemo, useState } from 'react';

const greenColor = css`
  color: green;
`;

const minWidth = {
  200: css`
    min-width: 200px;
  `,
} as const;

const bananaButton = cx(greenColor, minWidth[200]);

export const BananaButton: FC = () => {
  const [count, setCount] = useState(0);
  const Three = 3;
  const dispBanana = useMemo(() => {
    if (count % Three === 0 || count.toString().includes(Three.toString())) {
      return 'バナナ';
    }
    return count.toString();
  }, [count]);

  return (
    <div>
      <button
        className={bananaButton}
        onClick={() => setCount((count) => count + 1)}
        type="button"
      >
        count is: {dispBanana}
      </button>
    </div>
  );
};
