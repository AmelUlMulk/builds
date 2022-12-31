import React from 'react';
import Image from 'next/image';
import PageHero from '../components/Contact/PageHero';
import client from '../utils/connections/AppoloClient';
import { CONTACT_PAGE, CONTACT_PAGE_INTERFACE } from '../api/contactPage';
import Head from 'next/head';

export async function getStaticProps() {
  const { data } = await client.query<CONTACT_PAGE_INTERFACE>(CONTACT_PAGE);
  return {
    props: {
      contactPage: data.contactPage
    }
  };
}

const Contact = ({
  contactPage: {
    slug,
    pageTitle,
    subheader,
    metaDescription,
    canonical,
    tollFree,
    fax,
    email,
    address,
    header,
    local
  }
}: CONTACT_PAGE_INTERFACE) => {
  return (
    <div className="Contact">
      <Head>
        <title>{pageTitle}</title>
        <link href={canonical} rel="canonical"></link>
      </Head>
      <PageHero />
      <section className="Call_us container pl-20 pb-10">
        <div className="Contact_details grid grid-cols-2 gap-20 px-5 pt-11 w-[70%] m-auto">
          <div className="Call_logo">
            <Image
              src={`https://res.cloudinary.com/see-sight-tours/image/upload/f_auto,fl_progressive:steep,q_auto,t_mobile/v1638579872/contact_page_nl2fuy.png`}
              alt="call_us_image"
              width={600}
              height={600}
            />
          </div>
          <div className=" ">
            <h2 className="font-bold text-4xl text-slate-700">
              Call Us Anytime from: <br /> 8am-4pm <br /> Monday-Friday
            </h2>
            <p className="text-3xl pt-5">
              <span className="text-sky-500 text-2xl">Toll Free</span>{' '}
              {tollFree}
            </p>
            <p className="text-3xl">
              <span className="text-sky-500 text-2xl">Local: {local}</span>
            </p>
            <p className="text-3xl">
              <span className="text-sky-500 text-2xl">Fax:</span> {fax}
            </p>
            <p className="text-sky-500 text-3xl">info@seesight-tours.com</p>
          </div>
        </div>
      </section>
      <section className="contact_us_form bg-gray-100">
        <div className="container pt-20">
          <div className="w-[40%] m-auto text-center pl-20 ">
            <form className="flex flex-col text-center pb-20">
              <h2 className="text-4xl font-bold text-slate-700">
                Send us a message
              </h2>
              <h4 className="text-2xl ">We&apos;d love to hear from you</h4>
              <input
                className="text-2xl border-b-[1px] border-black mt-5 pb-3 bg-gray-100"
                placeholder="Your Name"
              ></input>
              <input
                className="text-2xl border-b-[1px] border-black mt-5 pb-3 bg-gray-100 "
                placeholder="Your Email"
              ></input>
              <textarea
                className="text-2xl border-b-[1px] border-black mt-5 pb-3 bg-gray-100  "
                placeholder="Message"
              ></textarea>
              <div className="font-bold mt-5 ml-auto ">
                <button className="bg-red-500 rounded-lg text-3xl text-white py-2 px-10">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="location">
        <div className="location1_content grid grid-cols-2">
          <div className="location_Text bg-red-500 text-white text-center px-10 py-20">
            <h2 className="text-4xl font-bold">
              Where are we Canada
              <br />
            </h2>
            <br />
            <div className="text-3xl">
              <p>5779 Desson Avenue</p>
              <p>Niagara Falls</p>
              <p>Ontario, Canada L2G 3T5</p>
            </div>
          </div>
          <div className="location_map">
            <iframe
              title="Where are we Canada"
              src={`https://www.google.com/maps?q=${address?.[0]?.address1}${address?.[0]?.address2}${address?.[0]?.address3}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: '0' }}
              loading="lazy"
            />
          </div>
        </div>
        <div className="location2_content grid grid-cols-2">
          <div className="location_map"></div>
          <div className="location_Text bg-red-500 text-white text-center p-20">
            <h2 className="text-3xl font-bold">Where are we USA</h2>
            <br />
            <div className="text-3xl">
              <p>486 19th street</p>
              <p>Niagara Falls</p>
              <p>Buffalo, USA NY 14303</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
