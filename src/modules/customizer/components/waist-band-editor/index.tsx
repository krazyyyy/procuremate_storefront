import { useState } from "react";
import ExpandableItem from "../exapandable-item";
import CheckBox from "../checkbox";
import TextInput from "../text-input";
import Dropdown from "../dropdown";
import { useCustomizer } from "@lib/context/customizer-context";
import { FontSettings } from 'types/ffg'
import { MaterialPreview } from "../main-material-editor";



const WaistBandEditor = ({ }) => {
  const [checked, setChecked] = useState(false);
  const [backFontStyle, setBackFontStyle] = useState<FontSettings>({
    text: '',
    fontFamily: 'Montserrat',
    fontSize: 22,
  });
  const [frontFontTextStyle, setFrontFontStyle] = useState<FontSettings>({
    text: '',
    fontFamily: 'Montserrat',
    fontSize: 22,
  });
  const { current, setText, setFontSettings, setColor, currency } = useCustomizer()
  const { font } = current;
  const colors = [
    { color: 'yellow', name: 'White', price: 30, currency },
    { color: 'orange', name: 'Black to White', price: 30, currency },
  ];

  return <div className="flex flex-col h-full overflow-y-scroll overflow-x-hidden w-full">
    <CheckBox
      label="Front Name on Waistband"
      onChange={(event) => setChecked(!checked)}
      checked={checked} />

    <TextInput
      value={font.text}
      classname="mt-3"
      label="Front Name"
      placeholder="Enter Your Name"
      onChange={(e) => setText(e.target.value)} />
    <Dropdown label="Front Font Style" items={[
      { title: 'Arial', value: 'Arial Medium' },
      { title: 'Roboto', value: 'Roboto' },
      { title: 'Montserrat', value: 'Montserrat' },
    ]}
      onChange={(val) => setFrontFontStyle({ ...frontFontTextStyle, fontFamily: val })}
      value={frontFontTextStyle.fontFamily} />
    <div className="h-5 w-full"></div>
    <ExpandableItem title="Front Font Color Material" expandedInitially={false} >
      <>
        <CheckBox
          label="Add Outline [+ THB 200 per letter]"
          onChange={(event) => setChecked(!checked)}
          checked={checked}
        />
        <div className="grid mt-4 grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return <MaterialPreview key={index} material={item as any} setColor={setColor} />
          })}
        </div>
      </>

    </ExpandableItem>
    <ExpandableItem title="Front Outline Color Material" expandedInitially={false} >
      <div className="grid grid-cols-2 gap-3">
        {colors.map((item, index) => {
          return <MaterialPreview key={index} material={item as any} setColor={setColor} />
        })}
      </div>
    </ExpandableItem>
    <ExpandableItem title="Front Crystal Color Material" expandedInitially={false} >
      <>
        <CheckBox
          label="Add Front Contrasting
        Patch [+THB 200] "
          onChange={(event) => setChecked(!checked)}
          checked={checked}
        />
      </>
    </ExpandableItem>
    <ExpandableItem title="Front Patch Color Material" expandedInitially={false} >
      <>
        <CheckBox
          label="Front Name on Waistband"
          onChange={(event) => setChecked(!checked)}
          checked={checked} />

        <TextInput
          classname="mt-3"
          label="Back Name" placeholder="Enter Your Name"
          value={backFontStyle.text}
          onChange={(e) => {
            setFontSettings({ ...backFontStyle, text: e.target.value })
          }}

        />
        <Dropdown
          label="Back Font Style"
          items={[
            { title: 'Ariel', value: 'Ariel' },
            { title: 'Roboto', value: 'Roboto' },
            { title: 'Montserrat', value: 'Montserrat' },
          ]}
          onChange={(val) => setFontSettings({ ...backFontStyle!, fontFamily: val })}
          value={backFontStyle?.fontFamily} />
      </>
    </ExpandableItem>

  </div>;
}


export default WaistBandEditor;


export const ArrowIcon = ({ ...attributes }) => {
  return <svg {...attributes} width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 5.15712L1.13313 0.0872344C1.00996 -0.0291186 0.810255 -0.0291186 0.687127 0.0872345L0.0923877 0.649019C0.0332207 0.704872 -2.71854e-07 0.780666 -2.68401e-07 0.859679C-2.64947e-07 0.938691 0.0332207 1.01448 0.0923877 1.07034L6.277 6.9127C6.40017 7.02906 6.59987 7.02906 6.723 6.9127L12.9076 1.07038C12.9668 1.01452 13 0.93873 13 0.859717C13 0.780705 12.9668 0.704911 12.9076 0.649058L12.3129 0.087274C12.1897 -0.029079 11.99 -0.029079 11.8669 0.087274L6.5 5.15712Z" fill="white" />
  </svg>

}