import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At πWEAR , we are passionate about creating fashion that speaks to
            both style and substance. Our clothing is designed with meticulous
            attention to detail, blending timeless aesthetics with modern
            trends. Whether it’s a casual outing or a special occasion, we
            believe that fashion should not only make you look good but also
            feel confident and comfortable. Each piece is thoughtfully crafted,
            ensuring our customers receive high-quality products that reflect
            their unique personality and lifestyle.
          </p>
          <p>
            We are committed to sustainability and ethical practices, choosing
            materials and production methods that are kind to both people and
            the planet. Our goal is to make fashion accessible without
            compromising on quality, offering our customers an easy and
            enjoyable shopping experience. From innovative designs to excellent
            customer service, we strive to exceed expectations and build a
            community of fashion-forward individuals who value both creativity
            and craftsmanship.
          </p>
          <b className="text-red-600">Our Mission</b>
          <p>
            At πWEAR our mission is to redefine fashion with premium quality and
            cutting-edge designs that speak to individuality and style. We
            believe in creating clothing that empowers people to express their
            unique personalities, while providing comfort and longevity.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p classname="text-gray-600">
            Quality is at the heart of everything we do. From sourcing the
            finest fabrics to meticulous craftsmanship, we ensure that every
            piece is made to last. Our products go through rigorous testing to
            guarantee durability, comfort, and style, giving you confidence in
            what you wear.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p classname="text-gray-600">
            We know life can be busy, so we make shopping simple and convenient.
            From an easy-to-navigate website to fast shipping and a hassle-free
            return policy, we’ve designed every step to give you a seamless
            shopping experience. Looking great has never been this effortless.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Coustmer Service:</b>
          <p classname="text-gray-600">
            At πWEAR , customer satisfaction is our top priority. We pride
            ourselves on providing exceptional customer service that goes beyond
            just selling clothes. Our dedicated support team is here to ensure
            that your shopping experience is smooth and enjoyable from start to
            finish.
          </p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default About;
