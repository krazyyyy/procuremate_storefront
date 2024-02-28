import { NextPageWithLayout } from "types/global";
import { ReactElement, useRef, useState } from "react"
import Layout from "@modules/layout/templates"
import Head from "@modules/common/components/head"



const PrivacyPage: NextPageWithLayout = () => {
    return (
        <>
        <Head
            title={"Terms And Conditions - Procuremate"}
            description={"Terms And Conditions - Procuremate."}
        />
<div className="content-container py-6 pg-elm">
<h1>Terms and Conditions</h1>
    <p>Welcome to Procuremate, your premier destination for high-quality fightwear and gear. We are dedicated to providing you with the best gear to enhance your combat sports experience, whether you&apos;re a professional athlete or a passionate enthusiast. Before you explore our wide range of products, we encourage you to familiarize yourself with our Terms and Conditions, which are designed to ensure transparency and fairness in every aspect of our business relationship with you, from order placement to delivery and beyond.</p>

    <p>By engaging with our website and making a purchase, you are acknowledging and agreeing to comply with these terms.</p>

    <h2>PRODUCTION TIME</h2>
    <h3>Standard Production</h3>
    <p>Our standard production time for Procuremate products is approximately 3 to 4 weeks. This production period allows us to craft each item with precision and care. Please note that this time frame does not include the delivery period.</p>
    
    <p>There are however different time frames for Express Production (8 -12 days) and Super Express production (5 - 7 days).</p>
    
    <p>For specific delivery estimates, please refer to the options below:</p>

    <ul>
        <li><strong>Standard Delivery:</strong> After the standard production phase, your order will be prepared for delivery within 14 to 21 days.</li>
        <li><strong>Express Delivery:</strong> Express production time and your order will be prioritized for faster delivery, arriving at your doorstep within 3 to 5 days.</li>
        <li><strong>Super Express Delivery:</strong> With this option, both production and delivery will be expedited, and you can expect your order to reach you in just 10 to 12 days.</li>
    </ul>

    <h2>PRODUCTION PICTURES</h2>
    <p>In cases where your order is complex or includes unique details, we take an extra step to ensure your satisfaction. When your item is halfway through production, we&apos;ll send you a production picture. This visual representation will showcase all details, from wording to logos. It&apos;s your opportunity to verify that everything aligns with your expectations. Please take the time to review this image attentively, as we cannot accept responsibility for any errors or discrepancies not brought to our attention at this crucial stage.</p>
    
    <p>However, it&apos;s important to note that this is not the moment to request design, size, or length changes, as the item will already be in production. In the event of no response within 24 hours, we reserve the right to proceed based on our best judgment.</p>

    <h2>DESIGN CHANGES</h2>
    <p>We understand that sometimes plans change. If you decide to modify any aspect of your order or wish to cancel it entirely, please contact us immediately. However, changes or cancellations are not guaranteed, as production may have already commenced. If production is already underway, any requested changes will be subject to reasonable charges, determined at our discretion, based on the nature of the alterations.</p>

    <h2>COURIER DELIVERY TIMES & CUSTOMS</h2>
    <p><strong>Courier Delivery Times:</strong> Estimated courier delivery times are provided by external courier services and are beyond our control once the item is in their possession. We acknowledge that delays or non-delivery due to courier company actions or inactions are frustrating, and we regret any inconvenience they may cause. We recommend monitoring your tracking information closely for updates on your shipment.</p>

    <p><strong>Customs Inspections:</strong> On very rare occasions, parcels from Procuremate may experience delays due to customs inspections. Please understand that such circumstances are beyond our control, and we cannot accept responsibility for these uncommon occurrences.</p>

    <p><strong>Import Duties and Taxes:</strong> It&apos;s important to note that Procuremate bears no responsibility for any import duties or taxes that your government may levy on clothing imports. These fees are your responsibility to settle.</p>

    <h2>SIZING</h2>
    <p>We are committed to ensuring that your Procuremate item fits you perfectly. While our website provides a basic size suggestion based on your weight, we strongly recommend referring to our comprehensive size charts. These charts are designed to assist you in making the right choice, as body types can vary significantly. Your satisfaction with the fit of your gear is of paramount importance to us.</p>

    <h2>CANCELLATION/RETURNS/REFUNDS</h2>
    <p><strong>Cancellation:</strong> You have the option to cancel your order within 24 hours. We will refund your payment (minus any merchant fees) promptly. To request a cancellation, please email us as soon as you decide to do so. We will confirm whether production has commenced. If production is already in progress, any refund will be assessed at our discretion.</p>

    <p><strong>Returns & Refunds:</strong> At Procuremate, every item is custom-made with meticulous attention to detail. As a result, our products are non-returnable and non-refundable unless:</p>

    <ol>
        <li>Our workmanship is of poor quality.</li>
        <li>Our materials are not suitable for the intended purpose.</li>
        <li>The final item does not reasonably match the design you specified, allowing for a reasonable tolerance for differences.</li>
    </ol>

    <p>In the event that you believe your item is faulty, please contact us with a clear photo illustrating the issue. If a return is deemed necessary, we will provide you with the return address. Alternatively, we may send you a replacement or issue a refund.</p>

    <p><strong>Size Selection:</strong> Items cannot be returned due to incorrect size selection. While our size suggesting tool and recommendations are helpful, the final choice is yours to make. Size charts are provided to assist you in making an informed decision.</p>

    <p><strong>Fight Deadlines:</strong> It&apos;s important to understand that we do not guarantee delivery by specific dates, and refunds are not available for missed fight deadlines. We encourage you to plan your orders accordingly.</p>

    <h2>PRIVACY POLICY</h2>
    <p>Rest assured that Procuremate prioritizes your privacy and security. We do not store credit card details, nor do we share customer information with any third parties. Your personal data is treated with the utmost care and confidentiality.</p>

    <h2>THIRD PARTY LOGOS</h2>
    <p>If you wish to include third-party logos on your items, it is imperative that you secure proper permission from the intellectual property holder. We cannot add logos without the necessary authorization, as respecting intellectual property rights is essential to us.</p>

    <p>Thank you for choosing Procuremate. By placing an order with us, you agree to adhere to these terms and conditions. Should you have any questions or concerns, please do not hesitate to reach out to us. Your satisfaction is our priority, and we look forward to providing you with exceptional fight gear and service.</p>


</div>
</>
    )
}


PrivacyPage.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>
}

export default PrivacyPage;