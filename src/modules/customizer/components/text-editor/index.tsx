import React, { useEffect, useMemo, useState } from "react";
import Checkbox from "../checkbox";
import TextInput from "../text-input";
import Dropdown from "../dropdown";
import ExpandableItem from "../exapandable-item";
import AlignLeftIcon from "./align-left-icon";
import AlignCenterIcon from "./align-center-icon";
import AlignRightIcon from "./align-right-icon";
import CaseLeftIcon from "./case-left-icon";
import CaseAllCapsIcon from "./case-all-caps-icon";
import CaseTitleCaseIcon from "./case-title-case-icon";
import CaseRightIcon from "./case-right-icon";
import { useCustomizer } from "@lib/context/customizer-context";
import { CustomName, Material } from 'types/ffg'
import { fetchMaterials } from "../../../../lib/services/customizer";
import CheckBox from "../checkbox";
import clsx from "clsx";
import { TextCanvas } from "./text-canvas";
import ThumbnailImage from "../../../products/components/thumbnail-image";

function TextEditor() {
  const [checked, setChecked] = useState<CustomName>();
  const [crystalMaterials, setCrystalMaterials] = useState<Material[]>([])
  const [patchMaterials, setPatchMaterials] = useState<Material[]>([])
  const [fillMaterials, setFillMaterials] = useState<Material[]>([])
  const [save, setSave] = useState(false);

  const {
    current,
    getCurrencyRate,
    currency,
    setText,
    textSettings: settings,
    updateTextSettings: setSettings,
    setFontSettings,
    customNames: names,
    setShowExample,
  } = useCustomizer();
  const { font } = current;

  const calculatePrice = (price: number | string) => {
    var res = getCurrencyRate() * Number(price);
    return res.toFixed(0);
  }

  useEffect(() => {

    const getFillMaterials = async () => {
      var promises = [];
      var allMaterials: Material[] = [];
      if (!settings.name_settings) return;
      for (var material of settings.name_settings?.name_fill_materials) {
        promises.push(fetchMaterials(material.id));
      }
      var responses = await Promise.all(promises);
      for (var response of responses) {
        for (var item of response) {
          allMaterials.push(item as any);
        }
      }
      setFillMaterials(allMaterials)
    }
    const getPatchMaterials = async () => {
      var materials: Material[] = [];
      if (!settings.name_settings) return;
      if (settings.name_settings.patch_material) {
        var response = await fetchMaterials(settings.name_settings.patch_material.id)
        for (var item of response) {
          materials.push(item)
        }
      }
      setPatchMaterials(materials)
    }
    const getCrystalMaterials = async () => {
      var materials: Material[] = [];
      if (!settings.name_settings) return;
      if (settings.name_settings.crystal_material) {
        var response = await fetchMaterials(settings.name_settings.crystal_material.id)
        for (var item of response) {
          materials.push(item)
        }
      }
      setCrystalMaterials(materials)
    }
    getFillMaterials();
    getPatchMaterials();
    getCrystalMaterials();
  }, [settings.name_settings])

  const handleNameSelect = (newName: CustomName) => {
    setChecked(newName);
    setSettings({ ...settings, name_settings: newName })
  }

  return <div className={clsx(
    "flex flex-col text-xs small:text-base relative",
  )}>
    <TextCanvas />
    {/* <span>If you want a 3D name you must choose Embroidery</span> */}
    <TextInput
      classname="mt-3"
      label="Text"
      placeholder="Enter Your Text"
      value={font.text}
      onChange={(e) => {
        setText(e.target.value)
      }} />
    <Dropdown
      label="Font Style"
      items={[
        { title: 'Azonix', value: 'Azonix' },
        { title: 'BasicSquare', value: 'BasicSquare' },
        { title: 'Basic Square Solid', value: 'BasicSquareSolid' },
        { title: 'Basketball', value: 'Basketball' },
        { title: 'Big Noodle Titling Oblique', value: 'BigNoodleTitlingOblique' },
        { title: 'Big Noodle Titling', value: 'BigNoodleTitling' },
        { title: 'Bombard', value: 'Bombard' },
        { title: 'Dalek Pin Point', value: 'DalekPinPoint' },
        { title: 'Enchanted Land', value: 'EnchantedLand' },
        { title: 'Hawainas', value: 'Hawainas' },
        { title: 'Impact', value: 'Impact' },
        { title: 'Impact Unicode', value: 'impact-unicode' },
        { title: 'Impacted', value: 'Impacted' },
        { title: 'IronGate', value: 'IRONGATE' },
        { title: 'Consolas', value: 'Consolas' },
        { title: 'Diamante', value: 'Diamante' },
      ]}
      onChange={(val) => setFontSettings({ ...font, fontFamily: val })}
      value={font.fontFamily} />

    <Dropdown
      label=""
      items={[
        { title: 'Normal', value: 'normal' },
        { title: 'Bold', value: 'bold' },
        { title: 'Italic', value: 'italic' },
      ]}
      onChange={(val) => setFontSettings({ ...font, fontWeight: val })}
      value={font?.fontWeight} />

    {/* <div className="flex gap-4 mt-4">
      <TextAlignOption />
      <TextVerticalAlignOption />
    </div> */}
    {/* <div className="flex gap-4 mt-2">
      <TextHorizontalAlignOption />
      <TextAlignOptions />
    </div> */}
    {/* <button
        onClick={() => {
          setSettings({ ...settings, shadow: !settings.shadow })
        }}
        className="text-white border my-2 rounded py-1">
        3D ({settings.shadow ? 'active' : 'inactive'})
      </button> */}
    <div className="flex gap-4 items-center mt-2 mb-3">
      <span>Case</span>
      <TextCaseOptions />
    </div>
    <ExpandableItem expandedInitially={false} title="Font Color"  >
      <>
        <div className="grid grid-cols-3 gap-2">
          {fillMaterials.map((c, i) => {
            return <ColorItem
              {...c}
              onClick={() => {
                setFontSettings({ ...font, color: c });
              }} key={i} />
          })}
        </div>
      </>
    </ExpandableItem>
    {settings.name_settings?.can_have_outline && <div className="my-3">
      <CheckBox
        label={"Add Outline " + `[+ ${currency} ${calculatePrice((settings.name_settings?.outline_price) ?? 0)} per letter]`}
        onChange={(event) => setSettings({ ...settings, outline: !settings.outline })}
        checked={settings.outline ?? false}
      />
      <div className="h-2"></div>
      {settings.outline && <ExpandableItem title="Front Outline Color Material" expandedInitially={false} >
        <div className="grid grid-cols-3 gap-2">
          {fillMaterials.map((color, index) => {
            return <ColorItem
              key={color.id}
              {...color}
              onClick={() => {
                setSettings({ ...settings, outline_color: color });
              }}
            />
          })}
        </div>
      </ExpandableItem>}
    </div>}
    <button onClick={() => setShowExample(true)} className="rounded-full bg-primary text-black p-1 my-4">View Examples</button>
    {names.map((name) => {
      return <Checkbox
        key={name.id}
        label={`ADD NAME STYLE ${name?.title}`}
        onChange={() => handleNameSelect(name)}
        checked={checked === name} />
    })}
    {checked && <>
      {settings.name_settings?.can_have_patch && <div className="my-3">
        <CheckBox
          label={"Add Patch " + `[+ ${currency} ${calculatePrice(settings.name_settings?.patch_price)} per letter]`}
          onChange={(event) => setSettings({ ...settings, patch: !settings.patch })}
          checked={settings.patch ?? false}
        />
        <div className="h-2"></div>
        {settings.patch && <ExpandableItem title="Patch Color Material" expandedInitially={false} >
          <div className="grid grid-cols-3 gap-2">
            {patchMaterials.map((color, index) => {
              return <ColorItem
                key={color.id}
                {...color}
                onClick={() => {
                  setSettings({ ...settings, patch: true, patch_color: color });
                }}
              />
            })}
          </div>
        </ExpandableItem>}
      </div>}
      {settings.name_settings?.allow_special_finishes && <div className="my-3">
        {<ExpandableItem title="Select Finishes" expandedInitially={false} >
          <>
            <div className="grid grid-cols-3 gap-2">
              {settings?.name_settings?.finishes?.map((finish, index) => {
                return <FinishItem
                  active={settings.finish === finish}
                  onClick={() => {
                    if (finish.title.toLowerCase().includes("3d")) {
                      settings.shadow = true;
                    } else {
                      settings.shadow = false
                    }
                    setSettings({ ...settings, finish })
                  }}
                  {...finish}
                  key={index} />
              })}
            </div>
            {settings.name_settings?.can_have_crystals &&
              <div className="my-3">
                <CheckBox
                  label={"Add Crystal " + `[+ ${currency} ${calculatePrice(settings.name_settings?.crystal_price)} per letter]`}
                  onChange={(event) => setSettings({ ...settings, crystal: !settings.crystal })}
                  checked={settings.crystal ?? false}
                />
                <div className="h-2"></div>
                {settings.crystal && <ExpandableItem title="Crystal Color Material" expandedInitially={false} >
                  <div className="grid grid-cols-3 gap-2">
                    {crystalMaterials.map((color, index) => {
                      return <ColorItem
                        key={color.id}
                        {...color}
                        onClick={() => {
                          setSettings({ ...settings, crystal_color: color });
                        }}
                      />
                    })}
                  </div>
                </ExpandableItem>}
              </div>}
          </>
        </ExpandableItem>}
      </div>}
      <button
        onClick={() => {
          setSave(!save);
          setSettings({ ...settings, addText: true })
          setTimeout(() => {
            setSettings({ ...settings, addText: false })
          }, 400)
        }}
        className="">Save</button>
    </>
    }
  </div >
}

export default TextEditor;

type FinishProps = {
  id: string
  title: string
  price: string
  active: boolean
  is_three_d: boolean
  onClick: React.MouseEventHandler
}

function FinishItem({ title, price, active, onClick }: FinishProps) {
  const { currency, currentLayer, getCurrencyRate, } = useCustomizer()

  const totalPrice = useMemo(() => {
    if (currentLayer) {
      return Number(currentLayer?.customizer_area_id?.price_adjust ?? 0) * Number(price ?? 0) * getCurrencyRate()
    }
    return 0;
  }, [currency, currentLayer, getCurrencyRate, price])



  return <div
    onClick={onClick}
    className={clsx(
      "flex-col cursor-pointer gap-2 p-2 flex items-center justify-center font-semibold rounded",
      {
        '!bg-primary !text-black': active
      }
    )}>
    <p className="text-sm uppercase">{title}</p>
    <span>{currency} {totalPrice.toFixed(1)}</span>
  </div>
}

function TextAlignOption() {
  return <div className="p-2 rounded border w-full flex gap-2 items-center justify-center">
    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line y1="2.5" x2="14" y2="2.5" stroke="white" />
      <path d="M10.918 14H12.01L7.53 4.2H6.508L2.028 14H3.106L4.282 11.382H9.742L10.918 14ZM4.66 10.542L7.012 5.278L9.364 10.542H4.66Z" fill="white" />
      <line y1="15.5" x2="14" y2="15.5" stroke="white" />
    </svg>
    <span>Auto</span>
  </div>
}
function TextVerticalAlignOption() {
  return <div className="p-2 rounded border w-full flex gap-2 items-center justify-center">
    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0.5" y1="16" x2="0.500001" y2="2" stroke="white" />
      <path d="M10.918 14L12.01 14L7.53 4.2L6.508 4.2L2.028 14L3.106 14L4.282 11.382L9.742 11.382L10.918 14ZM4.66 10.542L7.012 5.278L9.364 10.542L4.66 10.542Z" fill="white" />
      <line x1="13.5" y1="16" x2="13.5" y2="2" stroke="white" />
    </svg>

    <span>0%</span>
  </div>
}
function TextHorizontalAlignOption() {
  return <div className="p-2 rounded border w-full flex gap-2 items-center justify-center">
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line y1="2.5" x2="14" y2="2.5" stroke="white" />
      <path d="M10.918 14H12.01L7.53 4.2H6.508L2.028 14H3.106L4.282 11.382H9.742L10.918 14ZM4.66 10.542L7.012 5.278L9.364 10.542H4.66Z" fill="white" />
      <line y1="15.5" x2="14" y2="15.5" stroke="white" />
      <line y1="17.5" x2="14" y2="17.5" stroke="white" />
    </svg>
    <span>0</span>
  </div>
}
function TextAlignOptions() {
  const [index, setIndex] = useState(0);
  const { current, setFontSettings } = useCustomizer()
  const { font } = current;

  useEffect(() => {
    switch (font.textAlign) {
      case 'left':
        setIndex(0);
        break;
      case 'center':
        setIndex(1);
        break;
      case 'right':
        setIndex(2);
        break;
    }
  }, [font])

  return <div className="rounded border w-full flex gap-2 items-center justify-center">
    <AlignLeftIcon active={index == 0} onClick={() => {
      setIndex(0);
      setFontSettings({ ...font, textAlign: 'left' })

    }} />
    <AlignCenterIcon active={index == 1} onClick={() => {
      setIndex(1);
      setFontSettings({ ...font, textAlign: 'center' })
    }} />
    <AlignRightIcon active={index == 2} onClick={() => {
      setIndex(2);
      setFontSettings({ ...font, textAlign: 'right' })
    }} />
  </div>
}
function TextCaseOptions() {
  const [index, setIndex] = useState(0);
  const { current, setFontSettings } = useCustomizer()
  const { font } = current;

  useEffect(() => {
    setIndex(font.case ?? 0);
  }, [font])
  return <div className="rounded h-10 border w-full flex gap-2 items-center justify-center">
    <CaseLeftIcon active={index == 0} onClick={() => {
      setIndex(0)
      setFontSettings({ ...font, case: 0 })
    }} />
    <CaseAllCapsIcon active={index == 1} onClick={() => {
      setIndex(1)
      setFontSettings({ ...font, case: 1 })
    }} />
    <CaseTitleCaseIcon active={index == 2} onClick={() => {
      setIndex(2)
      setFontSettings({ ...font, case: 2 })
    }} />
    <CaseRightIcon active={index == 3} onClick={() => {
      setIndex(3)
      setFontSettings({ ...font, case: 3 })
    }} />
  </div>
}


interface ColorItemProps extends Material {
  onClick: React.MouseEventHandler,
}

function ColorItem({ hex_color, image_url, title, onClick, }: ColorItemProps) {
  const getBackgroundColor = () => {
    if (image_url.startsWith('http')) {
      return `url(${image_url})`
    }
    return image_url.length > 0 ? image_url : hex_color;
  }


  return <div onClick={onClick} className="text-center">
    {image_url.startsWith('http') ?
      <ThumbnailImage
        src={image_url}
        alt="Image url"
        objectFit="cover"
        className="rounded cursor-pointer w-full"
        height={96}
        width={96} />
      : <div style={{ background: getBackgroundColor() }} className={`h-24 w-full rounded cursor-pointer`} />}
    <span className="uppercase block mt-2">{title}</span>
  </div>
}
