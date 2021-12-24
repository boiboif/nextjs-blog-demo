import { Viewer } from '@bytemd/react';
import breaks from '@bytemd/plugin-breaks';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight-ssr';
import math from '@bytemd/plugin-math-ssr';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import mermaid from '@bytemd/plugin-mermaid';
import gemoji from '@bytemd/plugin-gemoji';
import addHeading from './addHeading';
import 'bytemd/dist/index.min.css';
import 'highlight.js/styles/github-dark.css';

export default function Markdown({ value }: any) {
  const plugins = [
    breaks(),
    gfm(),
    footnotes(),
    frontmatter(),
    gemoji(),
    highlight(),
    math(),
    mediumZoom(),
    mermaid(),
  ];

  return (
    <div className="JuejinMarkDown">
      <div style={{ display: 'flex' }}>
        <div style={{ width: '100%' }}>
          <Viewer
            value={value}
            plugins={[...plugins, addHeading()]}
            sanitize={(e) => {
              return e;
            }}
          ></Viewer>
        </div>
      </div>
    </div>
  );
}
