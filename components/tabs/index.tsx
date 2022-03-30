import React, { ReactNode } from 'react';
import cn from 'classnames';
import Tab from './tab';
import styles from './index.module.css';

type Props = {
  activeIndex: number,
  className?: string,
  children: ReactNode,
  onTabChange: (index: number) => void,
};

const Tabs = ({
  activeIndex,
  className,
  children,
  onTabChange,
}: Props) => {
  const renderChildTabs = (): ReactNode => (
    React.Children.map(children, (child, index) => React.cloneElement(child as React.ReactElement, {
      onTabClick: onTabChange,
      tabIndex: index,
      isActive: index === activeIndex,
    }))
  );

  return (
    <div className={cn(styles.tabs, className)}>
      <ul className="px-4">
        {renderChildTabs()}
      </ul>
    </div>
  );
};

export { Tab };
export default Tabs;
