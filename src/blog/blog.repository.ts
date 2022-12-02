import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from '../database/generic.repository';
import { Blog, BlogDocument } from './entities/blog.entity';

@Injectable()
export class BlogRepository extends GenericRepository<BlogDocument> {
  constructor(@InjectModel(Blog.name) BlogModel: Model<BlogDocument>) {
    super(BlogModel);
  }
}
