import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog, BlogSchema } from './entities/blog.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogRepository } from './blog.repository';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository, JwtGuard, JwtStrategy, RolesGuard],
})
export class BlogModule {}
