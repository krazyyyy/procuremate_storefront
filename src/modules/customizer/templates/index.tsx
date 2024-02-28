import React, { useEffect, useState } from "react"
import FabricEditor from "../components/fabric-editor"
import { handleDeleteImage, useCustomizer } from "@lib/context/customizer-context"
import { useProduct } from "medusa-react"
import { useRouter } from "next/router"
import ConfirmSavePopup from "../components/confirm-popup/save-prompt"
import PromoRegisterPopup from "../components/confirm-popup/promo-register"
import { useQuery } from "@tanstack/react-query"
import { fetchCustomDesign } from "@lib/services/customizer"
import { loadDesign } from "@lib/util/customizer"
import { useAccount } from "@lib/context/account-context"


const CustomiserTemplate: React.FC = ({ children }) => {

  return (
    <div className="flex-1 small:py-12 h-full">
      <Canvas />
    </div >
  )
}
export default CustomiserTemplate;


function Canvas() {
  const {
    setCurrent,
    current,
    saved,
    setSaved,
    saveOrUpdate,
    setCanvasData,
    isLoading,
    setCustomDesignId,
    setLayerChanges,
    setTempChanges,
    setLayers } = useCustomizer();
  const router = useRouter()
  const [image, setImage] = useState<string>('')
  const { query } = useRouter() as any;
  const { product } = useProduct(query?.id)
  const { data, isLoading: loadingDesign } = useQuery([product?.id, 'Design data'], () => fetchCustomDesign(query?.design_id))
  const { template_image } = product?.metadata ?? { template_image: '' } as any;
  const [path, setPath] = useState('');
  const [saveVisible, setSaveVisible] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { customer } = useAccount();
  const [ignore, setIgnore] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!customer) setShowPromo(true);
    }, 30 * 60 * 1000);  // 30 minutes

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadData() {
      if (!product?.id || isLoading || loaded || loadingDesign) return;
      let designData = await loadDesign(product?.id);
      if (!data && designData && !saved) {
        const design = designData;
        if (design.design_data?.canvas) {
          setCanvasData(design.design_data.canvas as any)
        }
        setTempChanges(design.design_data?.design);
        setLayerChanges(design.design_data?.design);
        setLayers(design.design_data?.layers);
        setImage(design.design_data?.svg);

        setSaved(true);
        setLoaded(true);
        return;
      }
      if (data) {
        const design = data;
        setCustomDesignId(design.id);
        setTempChanges(design.design_data.design);
        setLayerChanges(design.design_data.design);
        setLayers(design.design_data.layers);
        setImage(design.design_data.svg);
        if (design.design_data?.canvas) {
          setCanvasData(design.design_data.canvas as any)
        }
        setCurrent({ ...current, svg: design?.design_data?.svg })
        setSaved(true);
        setLoaded(true);
      }
    }
    loadData();
  }, [data, product?.id, isLoading, loaded])



  useEffect(() => {

    const handleBeforeHistoryChange = (route: string) => {
      const newRoute = route;
      const shouldExcludePath = newRoute.includes('/customizer/');

      if (!saved && !shouldExcludePath && !redirect && !ignore) {
        setSaveVisible(true);
        setPath(newRoute);
        try {

          router.events.emit('routeChangeError');
          throw 'routeChange aborted';
        } catch (error) {
          throw 'routeChange aborted'
        }
      }
    };

    router.events.on('beforeHistoryChange', handleBeforeHistoryChange);

    return () => {
      router.events.off('beforeHistoryChange', handleBeforeHistoryChange);
    };
  }, [saved, router, redirect, customer, ignore]);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      // Cancel the event to prevent the user from navigating away
      if (!saved) {
        event.preventDefault();
        event.returnValue = 'Unsaved changes will be lost';
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saved]);


  const handleConfirm = () => {
    if (path.length > 0) {
      setRedirect(true);
      setTimeout(() => {
        router.push(path);
      }, 200)
      setSaved(true);
    }
  }

  const handleCancel = () => {
    setIgnore(true);
  }

  useEffect(() => {
    if (current.svg?.length > 0 && !image) {
      setImage(current.svg);
    }
    if (template_image && !image) {
      setImage(template_image);
    }
  }, [template_image, current, image]);

  useEffect(() => {
    setCurrent({ ...current, image: image })
  }, [image])

  useEffect(() => {
    if (product && !current.title) {
      setCurrent({
        ...current,
        price: product.variants.at(0)?.calculated_price ?? 0,
        description: product.description ?? '',
        title: product.title ?? '',
      })
    }
  }, [current, product])

  useEffect(() => {
    return () => setLayers([])
  }, [])

  if (loadingDesign) {
    return <div>Loading</div>
  }
  return <div className="h-[calc(100vh-260px)] small:h-[calc(100vh-200px)]">
    <div className="flex z-0 items-start mx-auto h-full w-full justify-center gap-5">
      <FabricEditor side="Front" img={image ?? '/boxing-short-template.svg'} />
      <ConfirmSavePopup
        visible={saveVisible}
        setVisible={setSaveVisible}
        onCancel={() => {
          setIgnore(true);
          setSaveVisible(false)
        }}
        onConfirm={async () => {
          setSaveVisible(false)
          var cus_id: string | undefined = (router.query?.customer_id as any) ?? customer?.id;
          if (current.url) handleDeleteImage(current.url);
          if (product)
            saveOrUpdate(product.id!, cus_id);
        }}
      />
      <PromoRegisterPopup
        visible={showPromo}
        onCancel={() => setShowPromo(false)}
        onConfirm={async () => {
          setShowPromo(false)
          setSaved(true);
          router.push({
            pathname: '/account/login',
            hash: 'signup',
            query: { q: window.btoa(JSON.stringify({ 'coupon': 'true' })) }
          })
        }}
      />
    </div>
  </div >
}