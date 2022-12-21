import {
  useRef,
  Children,
  cloneElement,
  ReactNode,
  isValidElement,
  useLayoutEffect
} from "react";

type ShowElementsType = {
  delay?: number | null;
  callback: (arg: Array<number>, arg2: Element) => void;
  once?: boolean;
  options?: IntersectionObserverInit;
};

export const useShowElements = ({
  delay = null,
  callback = () => {},
  once = true,
  options
}: ShowElementsType) => {
  const refs = useRef<Element[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownElement = useRef<Map<Element, Element>>(new Map());

  const setRefs = (ref: Element) => {
    if (!!ref) {
      refs.current.push(ref);
    }
  };

  useLayoutEffect(() => {
    if (!refs.current.length) return;
    const elements = refs.current;
    let elementInx: number[] = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = elements.indexOf(entry.target);
        const isElementNotShown = !shownElement.current.has(entry.target);

        function getTimeOutFunc() {
          return setTimeout(() => {
            if (!!elementInx.length) {
              callback(elementInx, entry.target);
              elementInx = [];
            }
          }, delay || 0);
        }

        function executeAfterElementShown() {
          shownElement.current.set(entry.target, entry.target);
          observer.unobserve(entry.target);
        }

        if (once && delay) {
          timer.current && clearTimeout(timer.current);
          if (isElementNotShown) {
            elementInx.push(index);
            timer.current = getTimeOutFunc();
            executeAfterElementShown();
            return;
          }
        }

        if (once) {
          if (isElementNotShown) {
            callback([index], entry.target);
          }
          executeAfterElementShown();
          return;
        }

        if (delay) {
          timer.current && clearTimeout(timer.current);
          elementInx.push(index);
          timer.current = getTimeOutFunc();
          return;
        }

        callback([index], entry.target);
      });
    }, options);

    elements.forEach((el) => {
      el && observer.observe(el);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
      refs.current = [];
    };
  }, [refs.current.length]);

  return { setRefs };
};

function getClonedElement(element: ReactNode, setRefs: (arg: Element) => void) {
  if (isValidElement(element)) {
    return cloneElement(element, {
      ...element?.props,
      ref: setRefs
    });
  }
  return element;
}

export const ObserveListElement = ({
  children,
  callback,
  delay = 300,
  once = true,
  options
}: ShowElementsType & {
  children: ReactNode | ReactNode[];
}) => {
  const { setRefs } = useShowElements({ delay, callback, once, options });

  if (!Array.isArray(children)) {
    return getClonedElement(children, setRefs);
  }

  return Children.map<ReactNode, ReactNode>(children, (child) => {
    return getClonedElement(child, setRefs);
  });
};
