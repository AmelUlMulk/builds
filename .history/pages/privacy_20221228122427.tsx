import React from 'react';
import Image from 'next/image';

const Privacy = () => {
  return (
    <>
      <div className="relative">
        <Image
          className="w-full h-96"
          src="https://res.cloudinary.com/see-sight-tours/image/upload/w_1312,h_500/t_header/f_auto,q_auto,/fl_progressive:steep/v1581438789/top-ottawa-Parliament-Buildings.webP"
          width={500}
          height={500}
          alt="See sight Tours"
        />
        <div className="absolute top-0 p-20">
          <h1 className="text-white text-6xl font-bold ">Our Privacy Policy</h1>
          <h2 className="text-white text-3xl font-light mt-4">
            This page informs you of our policies regarding the collection, use,
            and disclosure of personal data when you use our Service and the
            choices you have associated with that data
          </h2>
        </div>
      </div>
      <div>
        <h1 className="text-3xl">INFORMATION COLLECTED</h1>
        <p className="text-lg">
          When you access or use our Services, we collect information from and
          about you in order to book your tours
        </p>
      </div>
    </>
  );
};

export default Privacy;