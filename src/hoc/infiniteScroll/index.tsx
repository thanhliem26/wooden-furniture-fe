import { useEffect, useRef } from "react";
import lodash from 'lodash';

interface Props {
  children: any;
  dataLength: number;
  next: any;
  hasMore: boolean;
  loader?: any;
}

const InfiniteScroll = ({
  children,
  dataLength,
  next,
  hasMore,
  loader,
}: Props) => {
  const obs = useRef<HTMLDivElement>(null);
  const loading = useRef(false);

  useEffect(() => {
    const parentElement = obs.current;
    
    if (parentElement && dataLength !== 0) {
      const childElements = Array.from(parentElement?.children);
      if(lodash.isEmpty(childElements)) return;

      const elementWatch = childElements[dataLength - 1];
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(async (entry) => {
              if (entry.isIntersecting ) {
                //handle element in viewport
                if(!hasMore || loading.current) return;
                loading.current = true;
                await next();
                loading.current = false;
              } else {
                //handle element not in viewport
              }
          });
      });

      observer.observe(elementWatch);

      return () => {
          if (elementWatch) {
              observer.unobserve(elementWatch);
          }

        
      };
    }
  }, [obs.current, dataLength,  loading]);

  return (
    <div className="infinite__scroll" ref={obs}>
      {children}
      {loading && loader ? loader : null}
    </div>
  );
};

export default InfiniteScroll;
