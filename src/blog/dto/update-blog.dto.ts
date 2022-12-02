import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({ type: String, description: 'title' })
  title: string;
  @ApiProperty({ type: String, description: 'description' })
  description: string;
}
