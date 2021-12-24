import type { BytemdPlugin } from 'bytemd';

function addHeading(): BytemdPlugin {
  return {
    viewerEffect: ({ markdownBody, file }) => {
      const mapDomTree = (ele: Element) => {
        let headingIndex = 1;

        const go = (ele: Element) => {
          [...ele.children].forEach((item) => {
            if (/^H[1-2]/.test(item.tagName)) {
              item.setAttribute('id', 'heading-' + headingIndex);
              headingIndex++;
            }
            if (item.children) {
              [...item.children].forEach((c) => {
                go(c);
              });
            }
          });
        };

        go(ele);
      };

      mapDomTree(markdownBody);
    },
  };
}

export default addHeading;
