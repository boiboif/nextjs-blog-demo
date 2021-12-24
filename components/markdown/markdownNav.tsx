import { CSSProperties, FC } from 'react';
import { useEffect, useState } from 'react';
import * as bytemd from 'bytemd';
import Tocify from './tocify';

interface TocifyProps {
  value: string;
  style?: CSSProperties;
  className?: string;
}

const MarkdownNav: FC<TocifyProps> = (props) => {
  const { value, style, className } = props;
  const [tocify, setTocify] = useState<Tocify | null>();

  useEffect(() => {
    const file = bytemd.getProcessor({}).processSync(value);
    if (file) {
      const tocify = new Tocify(file.toString());
      setTocify(tocify);
    }
  }, [value]);

  return (
    <div style={style} className={className}>
      {tocify?.render()}
    </div>
  );
};

export default MarkdownNav;
