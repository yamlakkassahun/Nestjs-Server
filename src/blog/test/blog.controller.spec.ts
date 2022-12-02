import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from '../blog.controller';
import { BlogService } from '../blog.service';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';
import { Blog } from '../entities/blog.entity';
import { BlogStub } from './stubs/blog.stub';

// this is provided by the jest instead of the actual user service it will use the mocked one
jest.mock('../blog.service.ts');

describe('BlogController', () => {
  let blogController: BlogController;
  let blogService: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [BlogService],
    }).compile();

    blogController = module.get<BlogController>(BlogController);
    blogService = module.get<BlogService>(BlogService);

    // this will clear all the mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(blogController).toBeDefined();
  });

  describe('findOne', () => {
    describe('When the find One block is called', () => {
      // create a variable to store the mock result
      let blog: Blog;

      // passing parameters if there is any
      beforeEach(async () => {
        blog = await blogController.findOne(BlogStub().title);
      });

      // calling the service method with appropriate parameters
      test('it should call blogService', () => {
        expect(blogService.findOne).toBeCalledWith(BlogStub().title);
      });

      // then comparing the result
      test('then it should return a blog', () => {
        expect(blog).toEqual(BlogStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when the find all method is called', () => {
      let blogs: Blog[];

      beforeEach(async () => {
        blogs = await blogController.findAll();
      });

      test('it should call blogService', () => {
        expect(blogService.findAll).toBeCalledWith();
      });

      test('then it should return a blogs', () => {
        expect(blogs).toEqual([BlogStub]);
      });
    });
  });

  describe('create', () => {
    describe('when the create method is called', () => {
      let blog: Blog;
      let createBlogDto: CreateBlogDto;

      // this will create a dto and pass it to the create method on the controller
      beforeEach(async () => {
        (createBlogDto = {
          title: BlogStub().title,
          description: BlogStub().description,
        }),
          (blog = await blogController.create(createBlogDto));
      });

      test('then it should call usersService', () => {
        expect(blogService.create).toHaveBeenCalledWith(createBlogDto);
      });

      test('then it should return a newly created blog', () => {
        expect(blog).toEqual(BlogStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let blog: Blog;
      let updateBlogDto: UpdateBlogDto;

      beforeEach(async () => {
        (updateBlogDto = {
          title: 'update title',
          description: 'update description',
        }),
          (blog = await blogController.update(BlogStub().title, updateBlogDto));
      });

      test('then it should call usersService', () => {
        expect(blogService.update).toHaveBeenCalledWith(
          BlogStub().title,
          updateBlogDto,
        );
      });

      test('then it should return a user', () => {
        expect(blog).toEqual(BlogStub());
      });
    });
  });

  describe('remove', () => {
    describe('When the delete block is called', () => {
      // create a variable to store the mock result
      let blog: Blog;

      // passing parameters if there is any
      beforeEach(async () => {
        blog = await blogController.remove(BlogStub().title);
      });

      // calling the service method with appropriate parameters
      test('it should call blogService', () => {
        expect(blogService.remove).toBeCalledWith(BlogStub().title);
      });

      // then comparing the result
      test('then it should return a blog', () => {
        expect(blog).toEqual(BlogStub());
      });
    });
  });
});
