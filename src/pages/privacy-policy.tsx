import { NextPageWithLayout } from "types/global";
import { ReactElement, useRef, useState } from "react"
import Layout from "@modules/layout/templates"
import Head from "@modules/common/components/head"



const PrivacyPage: NextPageWithLayout = () => {
    return (
        <>
        <Head
            title={"Privacy Policy - Procuremate"}
            description={"Privacy Policy - Procuremate."}
        />
<div className="content-container py-6 pg-elm">
    <h1 className="text-xl">Privacy Policy</h1>
    <p>Please read the privacy policy below to understand how we collect, share, use, and store your personal information.</p>

    <h2>1. Introduction</h2>
    <p>Welcome to Procuremate&apos;s Privacy Policy. This comprehensive document explains how we, Procuremate (&apos;we,&apos; &apos;us,&apos; or &apos;our&apos;), collect, utilize, and safeguard personally identifying information (&apos;Personal Data&apos;) from users of our website (<a href="https://www.fiercefightgear.com">www.fiercefightgear.com</a>) (&apos;the Site&apos;) and customers who engage with our products or subscribe to our newsletter.</p>

    <h2>2. Our Commitment to Privacy</h2>
    <p>At Procuremate, we uphold a steadfast commitment to your privacy. Here&apos;s a comprehensive overview of our privacy principles:</p>
    <ul>
        <li><strong>Transparency and Legitimacy:</strong> Your personal data will be collected, used, and shared for legitimate business purposes only as explained in the privacy policy or when compelled by legal requirements. We believe in full transparency and will provide clarity about what Personal Data we collect and how we process it.</li>
        <li><strong>Data Integrity and Security:</strong> We take responsibility for maintaining the accuracy and integrity of your Personal Data. We employ strict security measures to protect your data from unauthorized access, use, alteration, or disclosure.</li>
    </ul>

    <h2>3. For Customers</h2>
    <h3>Data Collection</h3>
    <p>We collect specific Personal Data directly from you during the purchase process. This includes your name, phone number, postal address, and email address. The collection and processing of this data are grounded in the necessity to deliver the products you&apos;ve purchased.</p>
    <p>Additionally, when you interact with our website, various data is automatically collected, such as your IP address, browsing history, browser type, and more. This data aids in the operation of our website and ensures that you receive content relevant to your interests.</p>

    <h3>How We Use Your Data</h3>
    <p>Your Personal Data is utilized for the following purposes:</p>
    <ul>
        <li><strong>Order Management:</strong> We use your information to process and manage your purchases, ensuring a smooth shopping experience.</li>
        <li><strong>Marketing Communication:</strong> With your consent, we may contact you with marketing messages, such as newsletters, to keep you informed about our products and promotions.</li>
        <li><strong>Feedback and Analysis:</strong> We may reach out to you for surveys and feedback to enhance our products and services. We also analyze customer purchase history and website usage to improve our offerings.</li>
    </ul>

    <h3>Cookies</h3>
    <p>Our website employs cookies, small text files that assist in identifying data traffic patterns, personalizing content, and enhancing security. Please note that disabling essential cookies may limit the functionality of the site.</p>

    <h3>Google Analytics</h3>
    <p>Google Analytics, a web analytics service by Google, Inc., is used to provide us with insights into how users navigate our site. Importantly, this service does not link your IP address to other Google-held data.</p>

    <h3>Clarity</h3>
    <p>Clarity, a web analytics service by Microsoft Corporation, is employed to help us understand how users interact with our website. It aids in improving our website&apos;s performance and user experience. It&apos;s important to note that Clarity does not connect your IP address to any other data held by Microsoft.</p>

    <h3>LiveChat</h3>
    <p>LiveChat is a customer support and communication tool we use to provide real-time assistance to our website visitors. When you engage in a LiveChat conversation with us, we may collect information necessary for providing support, such as your name and email address. Rest assured, any data shared during LiveChat sessions is treated with the utmost privacy and security and is not used for any other purposes without your consent.</p>

    <h3>Data Sharing</h3>
    <p>We are committed to safeguarding your information. Your data will not be sold to third parties. We only share data as necessary to operate the website and provide our services as outlined in this Privacy Notice.</p>

    <h2>4. For Social Media Followers</h2>
    <h3>Data Collection</h3>
    <p>If you follow our social media accounts, we collect data such as your account name, gender, general interests, location, and age. This information helps us tailor our social media content and advertising to align with the preferences of our followers.</p>

    <h3>How We Use Your Data</h3>
    <p>The Personal Data we gather from social media followers is leveraged for:</p>
    <ul>
        <li><strong>Customized Content:</strong> We create bespoke social media content by analyzing your interests.</li>
        <li><strong>Targeted Advertising:</strong> Understanding responses to posts and advertisements enables us to deliver relevant content across our social media channels.</li>
        <li><strong>Community Insights:</strong> We analyze follower demographics to better understand our digital community.</li>
    </ul>

    <h3>Data Sharing</h3>
    <p>Rest assured that we do not sell your information, and data is shared only in accordance with this Privacy Notice.</p>


    <h2>5. For Website Visitors</h2>
    <h3>Data Collection</h3>
    <p>When you visit our website, we automatically collect various types of data to improve your experience and tailor our content. This data may include:</p>
    <ul>
        <li>Your IP address</li>
        <li>Site referrals</li>
        <li>Browsing patterns</li>
        <li>Browser type</li>
        <li>Location information</li>
        <li>General interests</li>
        <li>Age</li>
    </ul>
    <p>This information is crucial for personalizing website content, understanding user preferences, creating targeted marketing messages, and gathering site statistics.</p>

    <h3>How We Use Your Data</h3>
    <p>We utilize the data collected from website visitors for the following purposes:</p>
    <ul>
        <li><strong>Personalize Content:</strong> We tailor the content on our website based on your age range and general interests to provide you with a more relevant experience.</li>
        <li><strong>User Insights:</strong> Analyzing the website pages you visit helps us gain insights into your behavior and preferences, allowing us to continuously improve our website.</li>
        <li><strong>Marketing Optimization:</strong> By analyzing click-through rates and visitor demographics, we can fine-tune our marketing messages and promotional activities.</li>
        <li><strong>Retargeting:</strong> We use cookies hosted on our site to retarget visitors with relevant marketing messages and advertisements based on their previous interactions with our website.</li>
    </ul>

    <h3>Data Sharing</h3>
    <p>We want to reassure you that your data is not sold to third parties. It is shared only as required to operate the website or as mandated by applicable law. We take data privacy and security seriously and have measures in place to protect your information.</p>


    <h2>6. Data Processors</h2>
    <h3>Our Data Processors</h3>
    <p>We work with trusted third-party processors who assist us in collecting, exporting, processing, and storing Personal Data on our behalf. These processors play a crucial role in supporting our operations and services. Our current data processors include:</p>
    <ul>
        <li><strong>Payment Processor:</strong> We use PayPal and Stripe to securely process payments for your purchases.</li>
        <li><strong>Social Media Platforms:</strong> Our presence on social media platforms like Facebook, Instagram, YouTube, and Twitter is managed by these platforms, and they may collect data as described in their respective privacy policies.</li>
        <li><strong>Web Management Tools:</strong> To analyze and improve our website&apos;s performance and user experience, we use Google Analytics, a web analytics service by Google, Inc.</li>
    </ul>
    <p>We want to emphasize that these data processors are selected for their commitment to data security and privacy. They are bound by strict contractual obligations to handle your Personal Data confidentially and in compliance with applicable data protection laws.</p>


    <h2>7. International Data Transfers</h2>
    <h3>Transfers to Third Countries</h3>
    <p>We may transfer your Personal Data to third-party processors and partners located outside the European Economic Area (EEA) or your home country. These international data transfers are essential for various aspects of our business operations.</p>

    <p>Rest assured that we take diligent measures to ensure that your Personal Data receives protection equivalent to the standards within the EEA or in compliance with applicable data protection laws. This may involve:</p>

    <ul>
        <li>Compliance with the EU-U.S. Privacy Shield Framework, where applicable.</li>
        <li>Utilizing European Commission-approved model clauses or binding corporate rules for data protection.</li>
        <li>Ensuring that our third-party processors maintain robust data security and privacy practices.</li>
    </ul>

    <p>If you have questions or concerns regarding international data transfers, please do not hesitate to reach out to us using the contact information provided in section 12, &apos;Contact Us.&apos; Your data privacy and security remain our top priorities, and we are committed to safeguarding your information regardless of its location.</p>


    <h2>8. Data Security</h2>
    <h3>Security Measures</h3>
    <p>We prioritize the security and integrity of your Personal Data and have implemented robust technical and physical safeguards to protect it from unauthorized access, use, alteration, or disclosure. Our data security measures include, but are not limited to:</p>

    <ul>
        <li><strong>Device Encryption:</strong> We employ encryption techniques to secure data transmission between your device and our servers, ensuring that your information remains confidential.</li>
        <li><strong>Firewalls:</strong> Our network is protected by firewalls to prevent unauthorized access and data breaches.</li>
        <li><strong>Virus Checks:</strong> Regular virus scans and security assessments are conducted to detect and mitigate potential threats to your data.</li>
        <li><strong>Access Control:</strong> Access to Personal Data stored on local devices is restricted to authorized personnel only, who are bound by strict confidentiality agreements.</li>
    </ul>

    <p>We continuously monitor and update our security practices to stay aligned with industry standards and best practices. While we take every precaution to protect your data, it is essential to understand that no method of transmission over the internet or electronic storage is completely secure. We urge you to take precautions as well, such as regularly updating your passwords and using secure internet connections.</p>


    <h2>9. Duration of Storage</h2>
    <h3>Storage Period</h3>
    <p>We retain records of your Personal Data for specific periods of time to fulfill our legal and operational obligations. The duration of storage may vary depending on the nature of the data and the purposes for which it was collected. Here are the key storage periods:</p>

    <ul>
        <li><strong>As long as you remain a registered subscriber to our mailing list:</strong> If you are subscribed to our mailing list, we will retain your contact information to keep you updated on our products and promotions until you choose to unsubscribe.</li>
        <li><strong>As long as you are a registered user of our site:</strong> If you have an account on our website, we will retain your account information for as long as you maintain an active account with us.</li>
        <li><strong>For up to 36 months after a purchase with Boxxerworld:</strong> If you make a purchase from Boxxerworld, a specified storage period of up to 36 months may apply to fulfill legal requirements and provide customer support.</li>
        <li><strong>As long as necessary to provide our services:</strong> We will retain data required to fulfill the purposes outlined in this privacy policy and to comply with legal and regulatory obligations.</li>
    </ul>

    <p>Once the retention period expires, we will securely delete or anonymize your Personal Data in accordance with our data retention policies. If you have any questions regarding data retention or wish to request the deletion of your data, please contact us using the information provided in section 12, &apos;Contact Us.&apos;</p>


    <h2>10. What are Your Rights in Relation to Personal Data?</h2>
    <p>When it comes to your Personal Data, you have certain rights that you can exercise to ensure your data is handled appropriately. These rights include:</p>

    <ul>
        <li><strong>Manage Your Subscription Preferences:</strong> You have the right to manage your subscription preferences or unsubscribe from our marketing communications at any time. You can do this by clicking the &apos;unsubscribe&apos; link in the emails we send you.</li>
        <li><strong>Update and Correct Your Personal Information:</strong> You can request updates or corrections to your personal information if it is inaccurate or incomplete.</li>
        <li><strong>Request Access to All Personal Data Related to You:</strong> You have the right to request access to the Personal Data we have collected about you.</li>
        <li><strong>Request Data Restriction or Deletion:</strong> In certain circumstances, you can request that we restrict the processing of your Personal Data or delete it entirely. Please note that there may be legal or operational reasons that prevent us from fulfilling such requests immediately.</li>
        <li><strong>Data Portability Rights:</strong> You may have the right to receive a copy of your Personal Data in a structured, commonly used, and machine-readable format, allowing you to transfer it to another data controller.</li>
    </ul>

    <p>If you wish to exercise any of these rights or have concerns about how we use your Personal Data, please contact us using the information provided in section 12, &apos;Contact Us.&apos; We will promptly respond to your requests and address your concerns to the best of our ability while complying with applicable data protection laws.</p>


    <h2>11. Changes to Our Privacy Notice</h2>
    <p>We are committed to keeping you informed about changes to our privacy practices and policies. We may periodically update this Privacy Notice to reflect changes in our business operations, regulatory requirements, or to enhance your data protection rights. When we make material changes to this Privacy Notice, we will:</p>

    <ul>
        <li>Post the updated Privacy Notice on our website at <a href="https://www.fiercefightgear.com/privacy-policy">www.fiercefightgear.com/privacy-policy</a>.</li>
        <li>Notify registered subscribers of material changes via email to the extent feasible.</li>
    </ul>

    <p>We encourage you to review this Privacy Notice periodically to stay informed about how we collect, use, and protect your Personal Data. By continuing to use our services after any changes to this Privacy Notice, you agree to be bound by the updated terms and practices.</p>


    <h2>12. Contact Us</h2>
    <p>If you have any inquiries, concerns, or requests regarding your Personal Data, our privacy practices, or this Privacy Policy, please do not hesitate to contact us. You can reach out to us via email at <a href="mailto:manager@fiercefightgear.com">manager@fiercefightgear.com</a>.</p>

    <p>We take your privacy seriously, and your feedback is valuable to us. We are committed to addressing any questions or concerns you may have and ensuring that your Personal Data is handled responsibly and securely.</p>



    <p>Procuremate assumes the role of the Data Controller in respect of any Personal Data you submit to us or that we collect from or about you. Your privacy matters to us, and we are committed to ensuring your data is handled responsibly and securely.</p>
    </div>
</>
    )
}


PrivacyPage.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>
}

export default PrivacyPage;