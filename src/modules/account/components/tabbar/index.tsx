import React from 'react'
import TabItem from "@modules/products/components/tab-item";
import { useRouter } from 'next/router';


const Tabbar = ({ tabs, tab, setTab }: any) => {
  const { replace } = useRouter()

  return <div className="flex justify-center items-center">
    {tabs.map((item: any, i: number) => <TabItem
      key={i}
      title={item.title}
      active={tab === i}
      onClick={(e) => {
        setTab(i);
        replace({
          pathname: item.href
        })
      }} />)}
  </div>;
}

export default Tabbar