import { Test, TestingModule } from '@nestjs/testing';
import { BlogRepository } from '../blog.repository';
import { BlogService } from '../blog.service';

const mockBlogRepository = () => ({
  findOne: jest.fn(),
});

describe('BlogService', () => {
  let blogService: BlogService;
  let blogRepository: BlogRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        // this will simulate the blog repository
        { provide: BlogRepository, useFactory: mockBlogRepository },
      ],
    }).compile();

    blogService = module.get<BlogService>(BlogService);
    blogRepository = module.get<BlogRepository>(BlogRepository);
  });

  it('should be defined', () => {
    expect(blogService).toBeDefined();
  });

  describe('get blogs', () => {
    it('calls blogRepository and return all blogs', () => {
      expect(blogRepository.findOne).not.toHaveBeenCalled();
    });
  });
});
