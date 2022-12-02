import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ type: String, description: 'title' })
  title: string;
  @ApiProperty({ type: String, description: 'description' })
  description: string;
}
