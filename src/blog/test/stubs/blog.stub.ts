import { Blog } from 'src/blog/entities/blog.entity';

// this is dummy data
export const BlogStub = (): Blog => {
  return {
    title: 'Blog Title',
    description: 'Blog description',
  };
};
