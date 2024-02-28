import React, { useEffect, useMemo, useState } from "react";
import Checkbox from "../checkbox";
import TextInput from "../text-input-v2";
import Dropdown from "../dropdown";
import ExpandableItem from "../exapandable-item";
import CaseLeftIcon from "./case-left-icon";
import CaseAllCapsIcon from "./case-all-caps-icon";
import CaseTitleCaseIcon from "./case-title-case-icon";
import CaseRightIcon from "./case-right-icon";
import { useCustomizer } from "@lib/context/customizer-context";
import { CustomName, Material } from 'types/ffg'
import { fetchMaterials } from "@lib/services/customizer";
import CheckBox from "../checkbox";
import clsx from "clsx";
import { TextCanvas } from "./text-canvas";
import ThumbnailImage from "@modules/products/components/thumbnail-image";

function TextEditorV2() {
  const [checked, setChecked] = useState<CustomName>();
  const [crystalMaterials, setCrystalMaterials] = useState<Material[]>([])
  const [patchMaterials, setPatchMaterials] = useState<Material[]>([])
  const [fillMaterials, setFillMaterials] = useState<Material[]>([])
  const [save, setSave] = useState(false);
  const [fontSize, setFontSize] = useState<number>(34);
  const [outlineSize, setOutlineSize] = useState<number>(2)


  const {
    current,
    getCurrencyRate,
    currency,
    setText,
    textSettings: settings,
    updateTextSettings: setSettings,
    setFontSettings,
    customNames: names,
    addChange,
    setShowExample,
    textIndex,
    setTextIndex,
  } = useCustomizer();
  const { font } = current;

  const calculatePrice = (price: number | string) => {
    var res = getCurrencyRate() * Number(price);
    return res.toFixed(0);
  }

  const price = useMemo((): number => {
    var total = 0;
    if (settings?.patch) {
      var patchPrice = Number(settings?.name_settings?.patch_price ?? 0) * font.text.length;
      total += patchPrice;
    }
    if (settings?.crystal) {
      var crystalPrice = Number(settings?.name_settings?.crystal_price ?? 0) * font.text.length;
      total += crystalPrice;
    }
    if (settings?.outline) {
      var outlinePrice = Number(settings?.name_settings?.crystal_price ?? 0) * font.text.length;
      total += outlinePrice;
    }
    return (total * getCurrencyRate());
  }, [settings, font, getCurrencyRate])

  const storeChange = () => {
    let fontdata = { ...font };
    delete fontdata.color?.customColor
    addChange({
      id: 'text-' + textIndex,
      image_url: font.color?.image_url ?? '',
      layer_name: 'Text-Change',
      name: settings?.text ?? '',
      price: price,
      area_size: settings.size,
      metadata: {
        ...font,
        ...fontdata,
      },
      currency,
    },
      false,
      true
    )
  }
  const handleSave = async () => {

    setTextIndex(textIndex + 1);
    setSave(!save);
    setSettings({ ...settings, addText: true })
    setTimeout(() => {
      setSettings({ ...settings, addText: false })
      storeChange()
    }, 400)
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
      if (settings?.name_settings.patch_material) {
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


  const handleSizeChange = (type = 'increment') => {
    if (type === 'increment') {
      if (fontSize < 120) setFontSize(fontSize + 2)
    } else
      if (fontSize > 8) setFontSize(fontSize - 2)
  }
  const handleOutlineChange = (type = 'increment') => {
    if (type === 'increment') {
      if (outlineSize < 40) setOutlineSize(outlineSize + 2)
    } else
      if (outlineSize > 4) setOutlineSize(outlineSize - 2)
  }

  useEffect(() => {
    setSettings({ ...settings, outline_width: outlineSize });
  }, [outlineSize])

  useEffect(() => {
    setFontSettings({ ...font, fontSize: (fontSize * 2) });
  }, [fontSize])

  const className = "my-2 border-b border-primary bg-gray-200 p-4";

  return <div className={clsx("flex flex-col text-xs small:text-base relative")}>
    <TextCanvas />
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
    <div className="flex gap-4 items-center mt-2 mb-3">
      <span>Case</span>
      <TextCaseOptions />
    </div>
    <div className="flex gap-4 items-center mt-2 mb-3">
      <span className="w-full">Font Size</span>
      <button onClick={() => handleSizeChange('')} className="border  px-10 py-1 rounded-md w-full hover:bg-black hover:text-white">-</button>
      <input value={fontSize} onChange={({ target }) => {
        const { value } = target;
        if (/\d/.test(value)) {
          setFontSize(Number(value))
        }
      }} className="h-10 w-10 text-center border rounded-full" />
      <button onClick={() => handleSizeChange('increment')} className="border  px-10 py-1 rounded-md w-full hover:bg-black hover:text-white">+</button>
    </div>
    <ExpandableItem className={className} expandedInitially={true} title="Font Color"  >
      <>
        <div className="grid grid-cols-3 gap-2">
          {fillMaterials.map((c, i) => {
            return <ColorItem
              className="border h-full w-full"
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
      {settings.outline && <ExpandableItem className={className} title="Front Outline Color Material" expandedInitially={false} >
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-3 flex items-center justify-start gap-3">
            <p className="w-full">  Outline Width:</p>
            <button onClick={() => handleOutlineChange('')} className="border bg-gray-500 text-white  px-10 py-1 rounded-md w-full hover:bg-black hover:text-white">-</button>
            <input value={outlineSize} onChange={({ target }) => {
              const { value } = target;
              if (/\d/.test(value)) {
                setOutlineSize(Number(value))
              }
            }} className="h-10 w-10 text-center border bg-gray-500 text-white rounded-full" />
            <button onClick={() => handleOutlineChange('increment')} className="border bg-gray-500 text-white  px-10 py-1 rounded-md w-full hover:bg-black hover:text-white">+</button>
          </div>
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
    <button onClick={() => setShowExample(true)} className="rounded-full bg-primary text-black p-4 my-4">View Examples</button>
    {names.map((name) => {
      return <Checkbox
        key={name.id}
        label={`ADD NAME STYLE ${name?.title}`}
        onChange={() => handleNameSelect(name)}
        checked={checked === name} />
    })}
    <div className="h-4"></div>
    {checked && <>
      {settings.name_settings?.can_have_patch && <div className="my-3">
        <CheckBox
          label={"Add Patch " + `[+ ${currency} ${calculatePrice(settings.name_settings?.patch_price)} per letter]`}
          onChange={(event) => setSettings({ ...settings, patch: !settings.patch })}
          checked={settings.patch ?? false}
        />
        <div className="h-2"></div>
        {settings.patch && <ExpandableItem className={className} title="Patch Color Material" expandedInitially={false} >
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
        {<ExpandableItem className={className} title="Select Finishes" expandedInitially={false} >
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
                {settings.crystal && <ExpandableItem className="my-5 border-b border-primary" title="Crystal Color Material" expandedInitially={false} >
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
        onClick={handleSave}
        className="my-3 py-4 w-full bg-primary rounded uppercase">Save</button>
    </>
    }
  </div >
}

export default TextEditorV2;

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

function TextCaseOptions() {
  const [index, setIndex] = useState(0);
  const { current, setFontSettings } = useCustomizer()
  const { font } = current;

  useEffect(() => {
    setIndex(font.case ?? 0);
  }, [font])
  return <div className="rounded h-12 bg-c-black border w-full flex gap-2 items-center justify-center">
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
  className?: string
  title: string
  hex_color: string
  image_url: string
}

function ColorItem({ hex_color, image_url, title, onClick, className }: ColorItemProps) {
  const getBackgroundColor = () => {
    if (image_url.startsWith('http')) {
      return `url(${image_url})`
    }
    return image_url.length > 0 ? image_url : hex_color;
  }


  return <div onClick={onClick} className={clsx("text-center")}>
    {image_url.startsWith('http') ?
      <ThumbnailImage
        src={image_url}
        alt="Image url"
        objectFit="cover"
        className="rounded h-16 md:h-32 border cursor-pointer w-full"
        height={96}
        width={96} />
      : <div style={{ background: getBackgroundColor() }} className={`h-16 md:h-32 border w-full rounded cursor-pointer`} />}
    <span className="uppercase block mt-2">{title}</span>
  </div>
}
