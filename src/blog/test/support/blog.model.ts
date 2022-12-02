import { Blog } from '../../entities/blog.entity';
import { MockModel } from '../../../database/test/support/mock.model';
import { BlogStub } from '../stubs/blog.stub';

// this will allow as to use the abstract methods
export class BlogModel extends MockModel<Blog> {
  public entityStub = BlogStub();
}
