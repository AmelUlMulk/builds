import { gql } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { BLOG_PAGE, BLOG_PAGE_INTERFACE } from '../../api/blogPage';
import PageHero from '../../components/Contact/PageHero';
import client from '../../utils/connections/AppoloClient';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
interface Params {
  params: {
    slug: string;
  };
}

interface BLOGS {
  blogs: [
    {
      slug: string;
    }
  ];
}
const BLOGPAGE = styled.div`
  display: flex;
  position: relative;
  min-height: 100vh;
  width: 100;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 30px;
  }
  p {
    font-size: 20px;
  }
  .author-section {
     background: red !important;
    width: 100%;
    min-height: 15vh;
    padding: 2rem;
    display: flex;
    gap: 2rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    @media (max-width: 1000px) {
      flex-direction: column;
      gap: 1px;
    }
    img {
      border-radius: 50%;
    }
    .author-description {
      align-items: center;
      gap: 5rem;
      width: 90%;
      position: relative;
      h3 {
        color: rgb(57, 216, 221);
        margin-bottom: 1rem;
        margin-top: 0.5rem;
        letter-spacing: 1px;
        font-size: 30px;
        @media (max-width: 500px) {
          letter-spacing: 0px;
        }
      }
      p {
        color: rgb(130, 145, 146);
        font-size: 20px;
      }
    }
  }
  .cta-two-tone {
    background-image: url('https://res.cloudinary.com/see-sight-tours/image/upload/v1669883122/dark-back_tqnwfs.png');
    width: 70%;
    @media (max-width: 1200px) {
      width: 100%;
    }
    min-height: 200px;
    border-radius: 20px;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      margin-top: 1rem;
      color: white;
      font-size: 29px;
      padding: 0rem 1rem;
      text-align: center;
      min-height: 50%;
      position: relative;
      @media (max-width: 900px) {
        text-align: center;
      }
      @media (max-width: 500px) {
        text-align: center;
        height: 80%;
        font-size: 26px;
        margin-bottom: 2rem;
      }
    }
    .button-container {
      width: 100%;
      display: flex;
      background-image: url('https://res.cloudinary.com/see-sight-tours/image/upload/v1669883122/light-water_pjgzcg.png');
      background-position: center;
      justify-content: center;
      position: relative;
      min-height: 30%;
      border-radius: 0px 0px 20px 20px;
      @media (max-width: 500px) {
        height: 20%;
      }
      a {
        position: absolute;
        top: -35%;
        background: #fd5d5a;
        border-radius: 20px;
        width: 45%;
        height: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white !important;
        font-size: 21px;
        font-weight: bold;
        @media (max-width: 500px) {
          width: 60%;
          height: 60%;
          font-size: 20px;
        }
        &:hover {
          background: #fd3f3c;
        }
      }
    }
  }
`;

export async function getStaticPaths() {
  const { data } = await client.query<BLOGS>({
    query: gql`
      query BLOGS_PAGE {
        blogs(sort: "publication_date") {
          slug
        }
      }
    `
  });

  return {
    paths: data.blogs.map(blog => {
      console.log('the slug', blog.slug);
      return { params: { slug: blog.slug.toString() } };
    }),
    fallback: true
  };
}
export async function getStaticProps({ params }: Params) {
  const { slug } = params;
  console.log('the slug', slug);

  const { data } = await client.query<BLOG_PAGE_INTERFACE>({
    query: BLOG_PAGE(),
    variables: {
      slug
    }
  });

  return {
    props: {
      blogs: data.blogs
    }
  };
}

const Blog = ({ blogs }: BLOG_PAGE_INTERFACE) => {
  if (!blogs) {
    return <h2>Content not available</h2>;
  }
  const filteredContent = blogs[0].content
    ?.replace(/^### (.*$)/gim, '<h3>$1</h3>')
    ?.replace(/^## (.*$)/gim, '<h2>$1</h2>')
    ?.replace(/^# (.*$)/gim, '<h1>$1</h1>')
    ?.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    ?.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    ?.replace(/\*(.*)\*/gim, '<i>$1</i>')
    ?.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    ?.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    ?.replace(/\n$/gim, '<br />')
    ?.trim();
  return (
    <div>
      <PageHero />
      <BLOGPAGE>
        <div className="flex w-4/6 flex-col ">
          <h2>{blogs[0].pageTitle}</h2>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {filteredContent}
          </ReactMarkdown>
        </div>
      </BLOGPAGE>
    </div>
  );
};

export default Blog;
