import { BlogStub } from '../test/stubs/blog.stub';

export const BlogRepository = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(BlogStub()),
  findAll: jest.fn().mockResolvedValue([BlogStub]),
  create: jest.fn().mockResolvedValue(BlogStub()),
  update: jest.fn().mockResolvedValue(BlogStub()),
  remove: jest.fn().mockResolvedValue(BlogStub()),
});
