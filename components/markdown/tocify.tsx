import { Anchor } from 'antd';
import { last } from 'lodash';

const { Link } = Anchor;

/**
 * 根据key 查找父节点
 * @param array // 树
 * @param code // 当前节点的key
 * @param key // 参数2的键名
 */
export const findParents = <T extends {}>(
  array: T[],
  code: any,
  key: string,
): T[] => {
  let stack: T[] = [];
  let going = true;
  let walker = (array: any[], code: any) => {
    array.forEach((item) => {
      if (!going) return;
      stack.push(item);
      if (item[key] === code) {
        going = false;
      } else if (item['children']) {
        walker(item['children'], code);
      } else {
        stack.pop();
      }
    });
    if (going) stack.pop();
  };
  walker(array, code);
  return stack;
};

export interface TocItem {
  anchor: string;
  level: number;
  text: string;
  children?: TocItem[];
}

export type TocItems = TocItem[]; // TOC目录树结构

export default class Tocify {
  tocItems: TocItems = [];

  lastItem: TocItem = { anchor: '', level: 1, text: '' };

  index: number = 0;

  htmlString: string = '';

  htmlDom: Element | null = null;

  constructor(htmlString: string) {
    this.htmlString = htmlString;
    this.tocItems = [];
    this.index = 0;
    this.htmlDom = this.generateHtmlDom(htmlString);
    this.mapDomTree(this.htmlDom);
  }

  mapDomTree(dom: Element) {
    [...dom.children].forEach((item) => {
      if (/^H[1-2]/.test(item.tagName)) {
        this.add(item.textContent || '', Number(item.tagName.slice(1)));
      }

      if ([...item.children].length > 0) {
        [...item.children].forEach((v) => {
          this.mapDomTree(v);
        });
      }
    });
  }

  generateHtmlDom(htmlString: string) {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div;
  }

  add(text: string, level: number) {
    const anchor = `heading-${++this.index}`;
    const item = { anchor, level, text };

    if (this.tocItems.length === 0) {
      // 第一个 item 直接 push
      this.tocItems.push(item);
      this.lastItem = item;
    } else {
      if (item.level > this.lastItem.level) {
        // item 是 lastItem 的 children
        const { children } = this.lastItem;
        if (!children) {
          // 如果 children 不存在
          this.lastItem.children = [item];
          this.lastItem = item;
          return;
        }
      } else if (item.level <= this.lastItem.level) {
        if (item.level === (last(this.tocItems) as TocItem).level) {
          this.tocItems.push(item);
          this.lastItem = last(this.tocItems) as TocItem;
        } else {
          const parents = findParents(
            this.tocItems,
            this.lastItem.anchor,
            'anchor',
          );
          const parent = parents.find(
            (parent) => parent.level === item.level - 1,
          );
          if (parent) {
            parent.children?.push(item);
          } else {
            this.tocItems.push(item);
          }
          this.lastItem = item;
        }
      }
    }

    return anchor;
  }

  renderToc(items: TocItem[]) {
    // 递归 render
    return items.map((item) => (
      <Link key={item.anchor} href={`#${item.anchor}`} title={item.text}>
        {item.children && this.renderToc(item.children)}
      </Link>
    ));
  }

  render() {
    return <Anchor offsetTop={50} affix={false}>{this.renderToc(this.tocItems)}</Anchor>;
  }
}
