import styled from 'styled-components';
import Image from 'next/image';
const PageHero = () => {
  const PageHero = styled.div`
    height: 50vh;
    position: relative;
    &:before {
      background: black;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
      opacity: 0.5;
    }
    display: flex;
    .PageHero_container {
      position: absolute;
      left: 10%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      z-index: 1;
      h1 {
        font-size: 5rem;
      }
      p {
        font-size: 3rem;
      }
    }
  `;
  const StyledImage = styled(Image)`
    z-index: 0;
  `;

  return (
    <section className="Hero_Section opacity-80 ">
      <PageHero className="PageHero bg-no-repeat bg-cover bg-center flex justify-start items-center">
        <StyledImage
          alt="guidesImage"
          src="https://res.cloudinary.com/see-sight-tours/image/upload/q_auto,f_auto,c_fill,g_faces,h_570,w_958,y_0/v1582036498/Happy-group-tour-guides.webp"
          layout="fill"
        />
        <div className="PageHero_container flex flex-col pl-10 ">
          <div className="text-5xl font-bold text-white">
            <h1>Contact Us</h1>
          </div>
          <div className="text-2xl text-white">
            <p>We&apos;d love to hear from you</p>
          </div>
        </div>
      </PageHero>
    </section>
  );
};

export default PageHero;
