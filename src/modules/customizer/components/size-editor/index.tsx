import { useEffect, useState } from "react";
import { useCustomizer } from "@lib/context/customizer-context";
import Input from "@modules/common/components/input";
import { useForm } from "react-hook-form";
import { Size } from "types/ffg";
import clsx from "clsx";
import Button from "../../../common/components/button";

type FormValues = {
  height: string
  width: string
}

const SizeEditor = () => {
  const {
    customSizing,
    addChange,
    currentLayer,
    setCurrent,
    current,
    currency,
  } = useCustomizer();

  const [size, setSize] = useState<Size | undefined>();
  const [changed, setChanged] = useState(false);
  const { sizes } = customSizing ?? { sizes: [] };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      width: current.width,
      height: current.height,
    }
  })

  const handleSizeChange = (size: Size) => {
    setSize(size);
  }


  const predictSize = (s: number) => {
    if (s >= 0 && s <= 9) {
      var child = sizes.find((ss => ss.title.toLowerCase().includes('baby')))
      if (child)
        setSize(child);
    } else if (s >= 10 && s <= 15) {
      var m = sizes.find((ss => ss.title.toLowerCase().includes('toddler')))
      if (m)
        setSize(m);
    } else if (s >= 16 && s <= 21) {
      var xl = sizes.find((ss => ss.title.toLowerCase().includes('small child')))
      if (xl)
        setSize(xl);
    } else if (s >= 22 && s <= 31) {
      var siz = sizes.find((ss => ss.title.toLowerCase().includes('med child')))
      if (siz)
        setSize(siz);
    } else if (s >= 32 && s <= 39) {
      var siz = sizes.find((ss => ss.title.toLowerCase().includes('large child')))
      if (siz)
        setSize(siz);
    } else if (s >= 40 && s <= 49) {
      var siz = sizes.find((ss => ss.title.toLowerCase().includes('youth')))
      if (siz)
        setSize(siz);
    } else if (s >= 50 && s <= 58) {
      var siz = sizes.find((ss => ss.title.toLowerCase() === "xs"))
      if (siz)
        setSize(siz);
    } else if (s >= 59 && s <= 68) {
      var siz = sizes.find((ss => ss.title.toLowerCase() === "s"))
      if (siz)
        setSize(siz);
    } else if (s >= 69 && s <= 78) {
      var siz = sizes.find((ss => ss.title.toLowerCase() === "m"))
      if (siz)
        setSize(siz);
    } else if (s >= 79 && s <= 89) {
      var siz = sizes.find((ss => ss.title.toLowerCase() === "l"))
      if (siz)
        setSize(siz);
    } else if (s >= 90 && s <= 100) {
      var siz = sizes.find((ss => ss.title.toLowerCase() === "xl"))
      if (siz)
        setSize(siz);
    } else if (s >= 101 && s <= 110) {
      var siz = sizes.find((ss => ss.title.toLowerCase() === "2xl"))
      if (siz)
        setSize(siz);
    } else if (s >= 111) {
      var siz = sizes.find((ss => ss.title.toLowerCase() === "3xl"))
      if (siz)
        setSize(siz);
    }

  }
  const getAdjust = (adjust: number): number => {
    var res = 0;
    if (adjust > 0)
      res = 1 + Math.abs((adjust / 100))
    else {
      res = 1 + (adjust / 100)
    }
    return res
  }

  const submit = handleSubmit(data => {
    if (size) {
      var change = {
        id: currentLayer?.id ?? 'size',
        layer_name: currentLayer?.name ?? 'size',
        name: size.title,
        // price: getAdjust(Number(size.price_adjust)),
        price: Number(size.price_adjust),
        area_size: {
          ...size,
          optional: false,
        },
        image_url: '',
        currency,
        metadata: {
          ...size,
          ...data
        }
      };
      setCurrent({
        ...current,
        height: data.height,
        width: data.width,
        size,
      })
      addChange(change)
    }
  })


  useEffect(() => {
    if (current.size) {
      setSize(current.size);
    }
  }, [current])

  return <div className="flex text-xs small:text-base flex-col gap-4 overflow-y-scroll w-full">
    <Input
      type="number"
      {...register("height", {
        required: "Height is required",
      })}
      required
      errors={errors}
      onChange={() => {
        setChanged(true);
      }}
      autoComplete="height"
      name="height"
      label='Enter Your Height (cm)' />
    <Input
      {...register("width", {
        required: "Width is required",
      })}
      required
      errors={errors}
      onChange={(e) => {
        setChanged(true);
        predictSize(Number(e.target.value))
      }}
      type="number"
      name="width"
      autoComplete="width"
      label='Enter Your Weight (kg)' />

    <SizeDropdown
      items={sizes}
      onChange={(value) => handleSizeChange(value)}
      label="Select Size"
      value={size} />

    {<Button onClick={submit} disabled={!changed} className="rounded text-[11px] small:text-base font-semibold cursor-pointer !bg-gray-900 hover:!bg-primary ">
      Save
    </Button>}
  </div>
}

export default SizeEditor;


const SizeDropdown = ({ items, onChange, value, label, ...attributes }: {
  items: Size[],
  onChange: (size: Size) => void,
  value?: Size,
  label: string,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!event.target.value) return;
    if (onChange) onChange(JSON.parse(event.target.value));
  };
  return <div className={clsx("flex outline-none  flex-col gap-1 mt-2")}>
    <span className="block">{label}</span>
    <select value={JSON.stringify(value)} {...attributes} onChange={handleSelectChange} className="bg-c-black-2 rounded border py-1 active:outline-none focus:outline-none">
      <option value={JSON.stringify(null)}>-</option>
      {items?.map((i: Size, index: number) => {
        return <option value={JSON.stringify(i)} key={index}>{i.title}</option>;
      })}
    </select>
  </div>
}


export const ArrowIcon = ({ ...attributes }) => {
  return <svg {...attributes} width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 5.15712L1.13313 0.0872344C1.00996 -0.0291186 0.810255 -0.0291186 0.687127 0.0872345L0.0923877 0.649019C0.0332207 0.704872 -2.71854e-07 0.780666 -2.68401e-07 0.859679C-2.64947e-07 0.938691 0.0332207 1.01448 0.0923877 1.07034L6.277 6.9127C6.40017 7.02906 6.59987 7.02906 6.723 6.9127L12.9076 1.07038C12.9668 1.01452 13 0.93873 13 0.859717C13 0.780705 12.9668 0.704911 12.9076 0.649058L12.3129 0.087274C12.1897 -0.029079 11.99 -0.029079 11.8669 0.087274L6.5 5.15712Z" fill="white" />
  </svg>
}
