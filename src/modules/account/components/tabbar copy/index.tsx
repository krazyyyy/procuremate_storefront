import React from 'react'
import TabItem from "@modules/products/components/tab-item";


const Tabbar = ({ tabs, tab, setTab }: any) => {
  return <div className="flex justify-center items-center">
    {tabs.map((item: any, i: number) => <TabItem
      key={i}
      title={item}
      active={tab === i}
      onClick={(e) => { setTab(i) }} />)}
  </div>;
}

export default Tabbar