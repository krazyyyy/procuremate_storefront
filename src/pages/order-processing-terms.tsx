import { NextPageWithLayout } from "types/global";
import { ReactElement, useRef, useState } from "react"
import Layout from "@modules/layout/templates"
import Head from "@modules/common/components/head"



const PrivacyPage: NextPageWithLayout = () => {
    return (
        <>
        <Head
            title={"Order Processing Terms - Procuremate"}
            description={"Order Processing Terms - Procuremate."}
        />
<div className="content-container py-6 pg-elm">
<h1>Ordering & Delivery Information for Procuremate</h1>
    <p><strong>Production Time (Custom Items)</strong></p>
    <p>Please be aware that while we strive to meet the fight dates you provide, we cannot offer absolute guarantees for delivery times due to factors like natural disasters, conflicts, and other unforeseen circumstances that can impact airline and courier delivery schedules.</p>
    
    <p><strong>Standard Design and Production Service</strong></p>
    <p>Production typically takes about 3 to 4 weeks. Please allow an additional 14 - 21 days for free delivery. For express deliveries, you will receive your item in 3 - 5 days.</p>
    <p>Some items may be ready sooner, while others might take a bit longer.</p>
    <p>If you have a specific date in mind, please include it in the “Product Instructions” box during checkout.</p>
    
    <p><strong>Express Design and Production Service (Approximately USD 19 per item)</strong></p>
    <p>With this service, your items will be designed and prepared for shipping in approximately 8 - 12 working days, with an additional 3 - 5 days required for delivery with international courier services.</p>
    <p>If you have a particular date in mind, kindly mention it in the “Product Instructions” box during checkout.</p>
    
    <p><strong>Super Express Service (Approximately USD 39 per item)</strong></p>
    <p>We prioritize Super Express orders, so please let us know the latest date by which you need to receive your item. Feel free to contact us at any time to inquire about progress.</p>
    <p>Items will be designed and prepared for shipment as swiftly as possible with production and delivery taking 5 - 7 days for production and 3 to 5 days for delivery.</p>
    <p>If you have a specific date in mind, kindly include it in the “Product Instructions” box during checkout.</p>
    <h2>Shipping</h2>
    <p><strong>Standard postage is FREE</strong> and typically takes 14 - 21 days for delivery.</p>
    <p>For priority, super express service uses International courier services such as DHL, Fedex, taking 3-5 days to deliver.</p>
    <p>If you order custom and ready-made items simultaneously, please note that the ready-made items will be sent separately via standard free courier.</p>

    <h2>Taxes</h2>
    <p>Some deliveries to European countries may be subject to import taxes. Know that Procuremate bears no responsibility for any import duties or taxes that your government may levy on clothing imports.</p>

    <h2>Sizing</h2>
    <p>Our website provides a basic size suggestion based on your weight, not your height. While this suggestion is typically accurate, if you are exceptionally tall or short, you may need to make size adjustments. We recommend verifying your size by referring to our size chart and comparing it to your existing shorts for the best fit.</p>

    <h2>Christmas Shipping</h2>
    <p>During the holiday season, including Christmas, please anticipate slightly slower delivery times for both courier and postal services. To ensure timely delivery, we recommend placing your orders, latest, by December 12th.</p>

    <p>Thank you for choosing Procuremate. We are dedicated to providing you with top-quality products and a seamless ordering experience. If you have any further questions or require assistance, please do not hesitate to contact us.</p>
</div>
</>
    )
}


PrivacyPage.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>
}

export default PrivacyPage;