import { useEffect, useState } from "react"
import clsx from "clsx";
import HomePageDropdown from "../../../layout/components/pure-dropdown";
import { FindType, SectionState, Tab, SizeGuide } from "../../../../pages/size-chart";


const findTab = (array: Tab[], type: string): FindType => {

  var find = array.find((t) => t.title === type);
  if (find) {
    var index = array.indexOf(find);
    return { tab: find, index }
  }
  return { tab: undefined, index: undefined }
}

const SizeChart = ({ sizes }: { sizes: SizeGuide[] }) => {

  const [tabs, setTabs] = useState<Tab[]>([])
  const [section, setSection] = useState<SectionState>({ section: '', tabTitle: '', });

  useEffect(() => {
    const applySizes = async (sizes: any) => {
      var newTabs: Tab[] = []
      for (var size of sizes) {
        var { tab, index } = findTab(newTabs, size.type);
        if (tab && index) {
          newTabs[index].items = [...newTabs[index].items, size]
        } else {
          newTabs.push({ title: size.type, items: [size] })
        }
      }
      setTabs(newTabs)
      if (sizes) {
        setSection({
          section: sizes[0].category_id.name,
          tabTitle: newTabs[0].title,
        })
      }
      setCurrent(sizes[0])

    }
    if (sizes && tabs.length === 0)
      applySizes(sizes)

  }, [sizes, tabs?.length])



  const handleSectionChange = (sect: string, tabTitle: string) => {
    var size = sizes?.find((g) => g.category_id.name === sect);
    if (size) {
      setSection({
        section: sect,
        tabTitle
      });
      setCurrent(size);
    }
  }

  const [current, setCurrent] = useState<SizeGuide | undefined>();


  return (
    <div className="bg-[#f5f5f5]">
      <div className="bg-white">
        <div className="content-container">
          <h1 className="text-2xl py-4 small:text-[60px] font-bold text-center small:text-left italic small:leading-[73px]">Find Your Perfect Fit with Procuremate Size Chart</h1>
          <div className="flex mx-auto justify-center items-center">
            {tabs.map((tab: Tab, index) => <TabItem
              active={tab.title === section?.tabTitle}
              key={index}
              {...tab}
              onClick={(tab, tabTitle) => handleSectionChange(tab, tabTitle)} />)}
          </div>
        </div>
      </div>

      <div className="p-2 small:content-container font-montserrat mx-auto">
        <div className="small:p-3 pb-10 h-full">
          <RandomPositionText text={section?.section} />
          {current && <table className="w-full text-xs small:text-xl shadow-md bg-white border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="bg-primary rounded h-12">{current.column_one}</th>
                <th className="bg-primary rounded h-12">{current.column_two}</th>
                <th className="bg-primary rounded h-12">{current.column_three}</th>
                <th className="bg-primary rounded h-12">{current.column_four}</th>
              </tr>
            </thead>
            <tbody>
              {current?.values?.map((s) => {
                return <tr key={s.id} className="text-white font-medium small:font-bold">
                  <td className="bg-black rounded text-center p-4">{s.column_one}</td>
                  <td className="bg-black rounded text-center p-4">{s.column_two}</td>
                  <td className="bg-black rounded text-center p-4">{s.column_three}</td>
                  <td className="bg-black rounded text-center p-4">{s.column_four}</td>
                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </div>
  )
}

export default SizeChart;



function TabItem({ items, title, onClick, active }: { active: boolean, items: SizeGuide[], title: string, onClick: (value: string, tabTitle: string) => void }) {
  const [hover, setHover] = useState(false);
  return <div
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    className={clsx("p-4 relative rounded-t cursor-pointer", {
      '!bg-black !text-white ': hover || active,
    })}>
    <HomePageDropdown title={title} open={hover}>
      <div className="absolute top-full left-0 text-white min-w-fit w-full bg-black rounded-b p-4 py-8">
        {items?.map((item: SizeGuide) => {
          return <div onClick={() => onClick(item.category_id.name, title)} className={clsx("hover:text-primary font-medium my-1  whitespace-nowrap text-base")} key={item.id}>
            <span>{item.category_id.name}</span>
          </div>
        })}
      </div>
    </HomePageDropdown>
  </div>
}


function ArrowIcon({ rotate }: { rotate: any }) {
  return (
    <svg
      width="67"
      height="24"
      viewBox="0 0 67 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92894 13.1924 1.97919 12.6066 1.3934C12.0208 0.807616 11.0711 0.807616 10.4853 1.3934L0.939339 10.9393ZM67 10.5L2 10.5L2 13.5L67 13.5L67 10.5Z"
        fill="black"
      />
    </svg>
  );
}

function RandomPositionText({ text }: { text: string }) {
  const [position, setPosition] = useState("center");
  const [arrowRotate, setArrowRotate] = useState(0);

  useEffect(() => {
    const positions = ["start", "end"];
    const randomIndex = Math.floor(Math.random() * positions.length);
    const selectedPosition = positions[randomIndex];
    setPosition(selectedPosition);

    if (selectedPosition === "start") {
      setArrowRotate(0);
    } else if (selectedPosition === "end") {
      setArrowRotate(180);
    } else {
      setArrowRotate(0);
    }
  }, [text]);

  return (
    <div className={`py-16 h-[240px] flex gap-4 items-start justify-${position}`}>
      {position === "end" && <ArrowIcon rotate={arrowRotate} />}
      <span className="font-bold small:text-[40px]">{text}</span>
      {position == 'center' && <ArrowIcon rotate={arrowRotate} />}
      {position === "start" && <ArrowIcon rotate={arrowRotate} />}
    </div>
  );
}