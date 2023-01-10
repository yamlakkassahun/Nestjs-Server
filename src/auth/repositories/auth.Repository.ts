import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from '../../database/generic.repository';
import { Auth, AuthDocument } from '../entities/auth.entity';

@Injectable()
export class AuthRepository extends GenericRepository<AuthDocument> {
  constructor(@InjectModel(Auth.name) AuthModel: Model<AuthDocument>) {
    super(AuthModel);
  }
}
