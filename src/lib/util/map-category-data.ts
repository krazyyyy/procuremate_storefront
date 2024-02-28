const getCategoryData = (name: string, collection_name: string | string[]) => {
    let data = {
            heading: "",
            heading_small: "",
            meta_title: "",
            meta_description: "",
            page_text: ""
        }; // Initialize an empty object
    const nameLower = name.toLowerCase()
    if (collection_name === "custom-fightwear") {
        if (nameLower.includes("boxing shorts")) {
            data = {
                heading: "Fight Shorts: Best Boxing Shorts and Boxing Trunks",
                heading_small: "Introducing Procuremate's Custom Boxing Shorts & Boxing Trunks",
                meta_title: "Sneaker Shop: Design your own boxing shorts and boxing trunks online",
                meta_description: "Shop the best boxing shorts & boxing trunks around. Find top quality options to make amazing boxing fightwear. Use our customizer to design it.",
                page_text: `Are you ready to step into the ring? Look no further and shop with us! We make the best boxing shorts and trunks in the business. Whether you prefer the classic style of boxing shorts or the high neck of boxing trunks, we have the perfect fit for every fighter. </br>
                Our customizable boxing shorts are not just for men, but also perfect for muay thai fighters and MMA enthusiasts.Designed with top athletes in mind, our shorts are made with high-quality satin fabric to ensure comfort and ease of movement. </br>
                Customization is our specialty! Choose from a variety of colors including black, blue, and red to design your own fightwear in unique style. We offer a wide range of options including a variety of custom designs, allowing you to select the perfect shorts or trunks that match your personality and brand. </br>
                Not only are our shorts and trunks lightweight, but they also come with a full range of performance enhancing features. They provide compression for optimum muscle support, ensuring that you perform at your best. </br>
                For the utmost comfort and ease during training and competition, our grappling shorts are an excellent choice. They are designed to grapple with ease, making it easier to find the perfect fit for your athletic needs. </br>
                At our Sneaker Shop, we take pride in offering the best selection of high-quality boxing shorts and trunks. Whether you are a professional athlete or a fitness enthusiast, we have the perfect option for you. Don't settle for less - choose our brand for the best boxing apparel in the market.`,
            };
        } else if (nameLower.includes("muay thai shorts")){
            data = {
                heading: "Custom Muay Thai Shorts - Personalize Your Fight Gear Online",
                heading_small: "Introducing our Custom Muay Thai Shorts:",
                meta_title: "Custom Muay Thai Shorts - Personalize Your Fight Gear Online",
                meta_description: "Shop the best quality custom Muay Thai shorts for men, women, and kids online! Discover our wide range of styles, and look your best in the ring.",
                page_text: `Gear up and step into the ring with confidence wearing our official custom Muay Thai shorts. Designed for fighters of all levels, our shorts are highly customizable to suit your style and the way you prefer. Muay thai shorts are made with the utmost quality, these shorts are a must-have for any Muay Thai boxer and enthusiast. </br>
                Whether you're a seasoned fighter or a beginner, our online store offers a wide range of customisable options for men, women, and kids. Each pair is carefully crafted to ensure the best fit and comfort, allowing you to focus on your fight. </br>
                We take pride in being the first choice for muay thai gear. Our shorts are made in Thailand, the home of this martial art, to guarantee authenticity and traditional craftsmanship. </br>
                With our custom options, you can create a unique look that represents your personal style. Choose from a variety of colors, designs, and materials to make your mens Muay Thai shorts one-of-a-kind. </br>
                At our boxing shop, customer satisfaction is our top priority. We strive to provide the best customer service and ensure that you find the perfect pair of shorts that not only looks great but also enhances your performance in the ring. </br>
                Don't settle for anything less than the best. Shop now and experience the unbeatable quality and style our custom Muay Thai shorts offer. Upgrade your fight game and showcase your skills with confidence! </br>
                Besides offering Muay Thai Shorts, we also provide a range of boxing shorts. Explore our collection now and elevate your performance with confidence!`,
            };
        } 
        else if (nameLower.includes("jackets")){ 
            data = {
                heading: "Custom Boxing Jacket - Ring Jackets for Boxers",
                heading_small: "Stand Out On The Ring With Boxing Jackets and Coats",
                meta_title: "Custom Boxing Jacket - Ring Jackets for Boxers",
                meta_description: "Step into the ring with style in our handmade custom boxing jacket. This unique robe features pockets for fighters who demand personalized perfection",
                page_text: `With our exceptional collection of Custom Boxing Jackets and Boxing Coats, you can box confidently with style. Crafted with meticulous attention to detail, these boxing jackets are designed to elevate your fighter persona and keep you comfortable through every round. </br>
                Available for both men and women, our boxing jackets and other activewear are made from high quality satin, providing a luxurious feel that complements your status as a champion. Whether you're heading to the boxing gym for a workout, preparing for a match, or making your grand entrance, these boxing ring jackets combine lightweight comfort with striking design. </br>
                Personalization is key – our boxing jackets, boxing coats, corner jackets, hooded jackets, and other athletic mens sportswear can be customized with your preferred color, size, design, logos, embroidery, or your fighter name, ensuring your jacket reflects your unique identity. From jackets with hoods to zips, every detail is designed with boxers in mind. We also offer customized and ready made satin boxing robes, tops, boxing shorts, hoodies, bomber jackets, boxing gloves, tracksuit, trunks, and other men's boxing fight wear and accessories in all sizes from 2XL to S to XL and more heavyweight fightwear or not. Are you starting us a small business? You can contact us to get customized unisex boxing hooded jackets, hooded sweatshirts, and other made-to-order items. </br>
                With worldwide shipping available, our commitment extends to fighters across the globe - boxing, Muay Thai, MMA, etc. As you step into the spotlight, our Custom Boxing Jackets ensure you're dressed for success. Whether you're a legendary world champion or an aspiring amateur, these jackets will make you feel like a force to be reckoned with on your next fight night. Don't miss the chance to own a piece of boxing fight wear– order your personalized boxing jacket today and show your inner champion with luxury.</br>
                `,
            };
        }
        else if (nameLower.includes("robes")){ 
            data = {
                heading: "Custom Boxer Robes: Satin Boxing Robe for Ultimate Style",
                heading_small: "Perfect Custom & Classic Satin Boxing Robes For Boxers",
                meta_title: "Custom Boxer Robes: Satin Boxing Robe for Boxers",
                meta_description: "Step into the ring with style with our custom satin boxing robes. Shop now to personalize your boxer robe for the perfect fight night wear.",
                page_text: `Step into the ring with style and confidence like a world champion by donning our exquisite collection of Custom Boxer Robes. Crafted with meticulous attention to detail, these silk satin boxing robes with hood are more than just attire and boxer robe costumes; they're an embodiment of your boxing persona. </br>
                Available in a range of sizes and styles, our custom boxer robes are the perfect outfit for adult men, women, boys, and even younger boxers - infants included. Designed to capture the essence of a true fighter, these robes and boxer costumes feature a variety of options, from classic designs to hooded boxing robes that add an air of mystery to your entrance.</br>
                Get yourself silky satin robes as you personalize your robe with embroideries, fighter names, or championship titles, making each piece truly unique. Whether you're prepping for a match, celebrating a victory, or simply showing your boxing pride, our robes have got you covered.</br>
                Every detail matters to us, from the quality of the fabric to the professional craftsmanship. These robes for adult boxers are not just costumes; they're a symbol of your dedication to the ring. From the iconic full length design to the timeless boxer robe style, our fight collection caters to both men and women, ensuring every fighter finds their perfect fit. Don't forget to browse through our high quality custom boxing shorts set, jackets, gloves, trunks, muay thai shorts for thai boxing, cloak with hoods, and more. </br>
                Our dedication to providing high-quality boxing gear is unwavering, and our custom boxer robes are no exception. Made to be worn with pride, our robes are a testament to your boxing journey. Shop for men boxing robes, women boxing robes, and other items today and make a statement with your super warm, comfortable and adjustable custom boxer robes.</br>
                `,
            };
        }
    else if (nameLower.includes("t-shirts")){ 
        data = {
            heading: "Custom Boxing T-Shirts: Design Your Boxing Shirt Online",
            heading_small: "High-Quality Custom Boxing Shirts for women, men and kids",
            meta_title: "Custom Boxing T-Shirts: Design Your boxing tee shirt online",
            meta_description: "Elevate your boxing journey with our custom sponsorship boxing t-shirts. Discover the perfect blend of comfort and style in every shirt.",
            page_text: `Whether you're a dedicated boxer, a fan of the sport, or simply appreciate the boxing culture, our collection of boxing t-shirts has something for everyone. These boxing t-shirts are more than just apparel; they're a statement of your passion for the sport. Crafted with quality and comfort in mind, these shirts are designed to be durable, with high quality materials and are perfect for boxing gyms, boxing clubs and other activities. </br>
            Lots of people are interested in retro boxing, and vintage boxing designs that pay homage to legends like Muhammed Ali, Sugar Ray Robinson, Mike Tyson, Floyd Mayweather, Terence Crawford, Marvin Hagler, UFC champions and other boxing champions. If you are a fan, then with as little as a few clicks, you can bring the perfect t-shirt to life. You can customize t-shirts for for kick boxing, jiu jitsu, or get workout t-shirt. From iconic boxing gloves to bold graphic tees and muay thai shorts, we offer an array of options that reflect your unique taste. Are you working on your kickboxing, or you are an mma fighter? or just need simple v-neck shirts, gym shirts, boxing tees, vintage style classic t-shirt, etc.? Get your custom T-shirts here. We also offer customizable t-shirts of all types. Get a short-sleeve tee, or a long-sleeve, choose the one that suits your needs </br>
            Our boxing t-shirts for sale are great and proudly designed to show your enthusiasm for boxing. Choose from a variety of mens and unisex t-shirts, long sleeves, MMA tank tops, and sweatshirts to find the perfect fit for your boxing-inspired wardrobe. Show your love for the sport, channel the spirit of legends, and make a statement that resonates both inside and outside the ring. Explore our collection and design your very own boxing T-shirt today. 
            `,
        };
    }
    }
    if (collection_name === "custom-equipment") {
        if (nameLower.includes("vests")){ 
            data = {
                heading: "Design High-Quality Custom Boxing Vests - Wear Latest Collection",
                heading_small: "Get Comfortable Boxing Vests for Sports, Training, & Competition ",
                meta_title: "Design High-Quality Custom Boxing Vests for Sport & Competition",
                meta_description: "",
                page_text: `Get the best training and competition experience with our exclusive collection of high-quality custom fight wear boxing vests. Whether you're stepping into the ring, sparring at the gym, or representing your team, our boxing vests are designed to meet your every need. Would you like to design your own boxing wear? With our custom design feature, you have the power to create a boxing vest that speaks volumes about your personality and dedication to the sport. Choose from a wide range of colors, including classic red, and add your team logo or personal touch for a unique look that demands attention. </br>
                Crafted for Performance: Our boxing vests are made from quality material, ensuring a lightweight and breathable fabric that keeps you cool and comfortable during intense workouts. The moisture wicking technology guarantees you'll stay dry, allowing you to perform at your best. </br>
                Designed for Fighters: Whether you're an amateur boxer, a seasoned pro, or part of a club, our vests cater to all levels of expertise. The ergonomic fit of our vests and boxing shorts provides freedom of movement, essential for delivering powerful punches and agile footwork. The durable and soft fabric ensures that you not only look the part but feel comfortable throughout your training sessions and matches with our products. </br>
                Our vests are the number one choice for boxers across the UK, USA and worldwide. The superior quality, colour, size, and stylish design make our vests perfect during training, sparring, and making a statement in the ring. Improve your boxing apparel with Procuremate. Print any logo or image to brand your vest. Our boxing vests are more than just clothing – they're a statement of dedication, passion, and the pursuit of excellence. Show your commitment to the sport, and perform with unparalleled confidence. </br>
                `,
            };
        }
        else if (nameLower.includes("head guard")){ 
            data = {
                heading: "Custom Boxing Headgear: Protective Gear for Sparring & Competition",
                heading_small: "Protective Custom Boxing Headgear for Sparring & Competition",
                meta_title: "Custom Boxing Headgear: Protective Gear for Sparring & Competition",
                meta_description: "Shop the finest selection of custom boxing headgear for sparring and competition. Our open face headguards provide full protection and comfort in the ring.",
                page_text: `Boxing headgear is an essential piece of protective gear for any boxer, whether you're sparring or competing. It can help to protect your head from cuts, bruises, and concussions. </br>
                Our boxing headgears are excellent choices for training, gyms, and even pro fights. The headgear available with Procuremate stands out as one of the most traditional looking. With our tools, you can easily customize your headgear to the design and fit you want. Do you want to include your name, logo, flag, or any other design on your fight equipment? Using our customizer, you can bring your designs to life and have your fight gear just the way you want it. </br>
                Do you want a full face headgear or an open face headgear? We can suit your customization requirements and make sure your custom headgear is just as you would want it. Our boxing headgear is typically made from leather or synthetic materials. Leather headgear is more durable, but it can also be more expensive. Synthetic headgear is less durable, but it is also more lightweight and breathable. Customize the color and designs of your headgear for the sport. Our customization options go from size options to premium styles/designs, and even features. Let us worry about your protection and give you results with high quality. </br>
                No matter what type of boxing head guards you choose, make sure to wear it every time you spar or compete. It's the best way to protect your head and stay safe in the ring. Get custom boxing headgear, sparring headgear, pads, MMA shorts, Muay Thai shorts, and more with Procuremate. Enhance your fighting experience today!
                `,
            };
        }
        else if (nameLower.includes("groin guard")){ 
            data = {
                heading: "Custom Groin Protectors: Pro Guard for MMA & Boxing",
                heading_small: "Improve combat sports experience with Custom Groin Protectors",
                meta_title: "Custom Groin Protectors: Pro Guard for MMA & Boxing",
                meta_description: "Explore our selection of custom groin protectors for professional MMA and boxing training. Top-notch protection and style in various sizes and colors.",
                page_text: `Designed to provide top-tier protection for your sensitive groin area, our custom boxing groin protectors offer unparalleled comfort and security, allowing you to train and compete with confidence. </br>
                When it comes to groin protection, there's no compromise. Our selection of groin guards and equipment offers a variety of options tailored to meet the needs of both professional athletes and those who are serious about their sport. Whether you're into boxing or MMA, our groin guards ensure that your training and competition are focused solely on your performance. </br>
                Made with complete attention to detail, our groin protectors offer optimal coverage while maintaining a comfortable fit. The superior quality of our protective cups ensures that you're safeguarded during even the most intense sparring sessions. With a range of sizes and styles available, finding the perfect fit is hassle-free. Our custom groin protectors allow for unrestricted movement while providing the necessary support to enhance your performance. Whether you're a man or woman, youth or adult, our selection caters to everyone, ensuring that the sensitive groin area remains fully protected. </br>
                Avoid the unnecessary discomfort and potential risks associated with subpar protective gear. Invest in the best with Procuremate Custom Groin Protectors and experience the freedom to spar, train, and compete without hesitation! </br>
                Besides offering Groin Protectors, we also provide Boxing Headgear, ensuring comprehensive protection for all your combat sports needs. Choose Procuremate for unbeatable safety and performance, allowing you to spar, train, and compete without any hesitation!
                `,
            };
        }
        else if (nameLower.includes("boxing gloves")){ 
            data = {
                heading: "Custom Boxing Gloves: Personalized Boxing Gear & Equipment",
                heading_small: "Enhance your boxing prowess with our Custom Boxing Gloves",
                meta_title: "",
                meta_description: "Design your custom boxing gloves and gear at our shop. Personalize with your name, logo, and colors. High-quality, unique options for a professional look.",
                page_text: `Looking for a unique and personalized way to show your love of boxing? Custom boxing gloves are the perfect way to do it! Crafted with precision and quality, our custom gloves are designed to offer not only exceptional performance but also a distinct look that sets you apart. With a wide range of customization options, you can place requests, choose the color that resonates with your spirit, add your flag or logo, and select designs that mirror your fighting style. You can even print your name, initials, or any piece of text on the personalized boxing gloves if you would like that. </br>
                Our custom boxing gloves are made from high-quality materials and technology, so you can be sure that they will last for years to come. They are also designed to provide maximum wrist protection and comfort, thanks to options like velcro and lace closures, so you can focus on your training, fighting, or sparring without having to worry about your gloves. We also have more custom boxing equipment and accessories that you wouldn't want to miss; custom made groin guard or protectors, brand new MMA shorts, classic boxing t-shirts, full leather kickboxing items, and other selections tailored to your desire. </br>
                Whether you are a professional boxer or fighter going for a pro fight, a serious amateur going to the gym, or just a casual enthusiast, FFG custom boxing gloves are the perfect way to show your love of the sport and they also make great gift items. Order your customisable and personalised boxing gloves and start showing your style! We offer worldwide shipping and delivery to customers in the USA and other countries. Got any questions? Contact us and we'll guide you in choosing ideal high quality male and female apparels. Be the champion that you are with the right fight gloves.
                `,
            };
        }
        else if (nameLower.includes("pads")){  
            data = {
                    heading: "Custom Boxing Mitts: Train with Pro Boxing Punch Mitts",
                    heading_small: "Get the best training experience and professional skills with Custom Boxing Mitts",
                    meta_title: "Custom Boxing Mitts: Train with Pro Boxing Punch Mitts Focus Pad",
                    meta_description: "Train your best with custom boxing mitts. Shop a variety equipment of punch mitts, gloves, and pads for optimal speed & technique in your boxing sessions.",
                    page_text: `Crafted to perfection, our punch mitts offer the best in training gear. With a focus on delivering exceptional performance, each mitt is designed to withstand the force of your strikes while providing the necessary cushioning for your hands and wrists. The curved design ensures a natural fit, allowing trainers to catch every punch with precision and accuracy.
                    Made from premium leather, these boxing pads are a testament to quality and durability. Whether you're training for boxing or Muay Thai, our focus mitts are the ideal companions for enhancing your skills. The curved punch mitts facilitate speed and agility, enabling you to work on combinations, footwork, and defensive maneuvers.
                    Trainers can now choose from a massive selection of boxing mitts, each designed to suit your unique training style. From everlast to white leather mitts, our shop offers a variety of options that cater to both beginners and seasoned fighters. Take your punch mitts training to the elite level and gain the vital edge needed to excel in the ring.
                    Incorporate these custom boxing mitts into your arsenal, and witness your skills reach new heights. As you strike, weave, and slip with precision, these mitts become an extension of your technique, helping you fine-tune every aspect of your game. Your journey from standard training to elite performance begins with Procuremate Custom Boxing Mitts – Get the best boxing mitts and boxing gear today.
                    Alongside our top-notch Boxing Mitts, we also offer a Groin Protector, providing comprehensive gear solutions for your training needs. Elevate your performance today with Procuremate Custom Boxing Mitts and explore our range of boxing gear."`
                };
            }
    }

    return data;
  };

export default getCategoryData;