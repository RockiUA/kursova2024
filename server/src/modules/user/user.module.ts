import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CityModule } from '@city/city.module';
import { RoleModule } from '@role/role.module';
import { User } from './models/user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [forwardRef(() => RoleModule), forwardRef(() => CityModule), SequelizeModule.forFeature([User])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
