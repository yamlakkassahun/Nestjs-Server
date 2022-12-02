import { HttpException, Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(private readonly BlogModel: BlogRepository) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    return await this.BlogModel.create(createBlogDto);
  }

  async findAll(): Promise<Blog[]> {
    return await this.BlogModel.find({});
  }

  async findOne(id: string): Promise<Blog> {
    return await this.BlogModel.findOne({ id });
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.BlogModel.findOne({ id });
    if (blog == null) {
      throw new HttpException('Blog not found', 404);
    }
    return await this.BlogModel.findOneAndUpdate({ id }, updateBlogDto);
  }

  async remove(id: string): Promise<Blog> {
    const blog = await this.BlogModel.findOne({ id });
    if (blog == null) {
      throw new HttpException('Blog not found', 404);
    }
    return await this.BlogModel.deleteOne({ id });
  }
}
