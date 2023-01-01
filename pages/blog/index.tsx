import React from 'react';
import { BLOGS_PAGE, BLOG_PAGE_INTERFACE } from '../../api/blogsPage';
import PageHero from '../../components/Contact/PageHero';
import client from '../../utils/connections/AppoloClient';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

export async function getStaticProps() {
  const { data } = await client.query<BLOG_PAGE_INTERFACE>(BLOGS_PAGE);
  console.log('data is here', data.blogs);
  return {
    props: {
      blogsPage: data.blogsPage,
      blogs: data.blogs
    }
  };
}

const BlogCards = styled.div`
  margin-bottom: 1rem;
  max-height: 600px;
`;
const StyledImage = styled(Image)`
  z-index: 0;
  height: 300px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;
const Blogs = ({ blogsPage, blogs }: BLOG_PAGE_INTERFACE) => {
  console.log('the blogs page', blogsPage);
  return (
    <div>
      <PageHero />
      <div className="w-full flex justify-center ">
        <div className="grid w-5/6 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1">
          {blogs.map(blog => (
            <BlogCards
              key={blog.slug}
              className=" max-w-sm w-full rounded overflow-hidden shadow-lg"
            >
              <StyledImage
                src={blog.heroMedia[0].url}
                alt={blog.heroMedia[0].url}
                width={500}
                height={200}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Mountain</div>
                <Link href={`/blog/${blog.slug}`}>
                  <p className="text-gray-700 text-base">{blog.header}</p>
                </Link>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #photography
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #travel
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #winter
                </span>
              </div>
            </BlogCards>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
