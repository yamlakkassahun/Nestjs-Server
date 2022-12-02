import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { BlogRepository } from '../blog.repository';
import { Blog } from '../entities/blog.entity';
import { BlogStub } from './stubs/blog.stub';
import { BlogModel } from './support/blog.model';

describe('blogRepository', () => {
  let blogRepository: BlogRepository;
  let blogModel: BlogModel;
  let blogFilterQuery: FilterQuery<Blog>;

  describe('find operations', () => {
    beforeEach(async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [
          BlogRepository,
          {
            provide: getModelToken(Blog.name),
            useClass: BlogModel,
          },
        ],
      }).compile();

      // this will simulate the blog repository
      blogRepository = moduleRef.get<BlogRepository>(BlogRepository);
      // this will simulate the blog model
      blogModel = moduleRef.get<BlogModel>(getModelToken(Blog.name));
      blogFilterQuery = { title: BlogStub().title };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when find One is called', () => {
        let blog: Blog;

        beforeEach(async () => {
          jest.spyOn(blogModel, 'findOne');
          blog = await blogRepository.findOne(blogFilterQuery);
        });

        test('then it should call the blogModel', () => {
          expect(blogModel.findOne).toHaveBeenCalledWith(blogFilterQuery, {
            _id: 0,
            __v: 0,
          });
        });

        test('then it should return blog', () => {
          expect(blog).toEqual(BlogStub());
        });
      });
    });

    describe('find', () => {
      describe('when find is called', () => {
        let blogs: Blog[];

        beforeEach(async () => {
          jest.spyOn(blogModel, 'find');
          blogs = await blogRepository.find(blogFilterQuery);
        });

        test('then it should call the blogModel', () => {
          expect(blogModel.find).toHaveBeenCalledWith(blogFilterQuery);
        });

        test('then it should return blog', () => {
          expect(blogs).toEqual([BlogStub()]);
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let blog: Blog;

        beforeEach(async () => {
          jest.spyOn(blogModel, 'findOneAndUpdate');
          blog = await blogRepository.findOneAndUpdate(
            blogFilterQuery,
            BlogStub(),
          );
        });

        test('then it should call the userModel', () => {
          expect(blogModel.findOneAndUpdate).toHaveBeenCalledWith(
            blogFilterQuery,
            BlogStub(),
            { new: true },
          );
        });

        test('then it should return a user', () => {
          expect(blog).toEqual(BlogStub());
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          BlogRepository,
          {
            provide: getModelToken(Blog.name),
            useValue: BlogModel,
          },
        ],
      }).compile();

      blogRepository = moduleRef.get<BlogRepository>(BlogRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let blog: Blog;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(BlogModel.prototype, 'save');
          constructorSpy = jest.spyOn(BlogModel.prototype, 'constructorSpy');
          blog = await blogRepository.create(BlogStub());
        });

        test('then it should call the BlogModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(BlogStub());
        });

        test('then it should return a Blog', () => {
          expect(blog).toEqual(BlogStub());
        });
      });
    });
  });
});
