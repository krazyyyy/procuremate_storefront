/* eslint-disable @next/next/no-css-tags */
import CustomiserTemplate from "@modules/customizer/templates"
import Head from "@modules/common/components/head"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import CustomizerLayout from "@modules/layout/templates/customizer-layout"
import { CustomizerProvider } from "../../lib/context/customizer-context"
import { TextCanvasProvider } from "../../lib/context/text-canvas-modal-context"

const Customiser: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Customizer" description="Customize your wished item." />
      <CustomiserTemplate />
    </>
  )
}

Customiser.getLayout = (page: ReactElement) => {
  return (
    <CustomizerProvider>
      <TextCanvasProvider >
        <CustomizerLayout>
          {page}
        </CustomizerLayout>
      </TextCanvasProvider>
    </CustomizerProvider>
  )
}

export default Customiser
