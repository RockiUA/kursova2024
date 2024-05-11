import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '@user/user.module';
import { Role, UserRole } from './models';
import { RoleResolver, UserRoleResolver } from './resolvers';
import { RoleService, UserRoleService } from './services';

@Module({
  imports: [forwardRef(() => UserModule), SequelizeModule.forFeature([Role, UserRole])],
  providers: [RoleService, UserRoleService, RoleResolver, UserRoleResolver],
  exports: [RoleService, UserRoleService],
})
export class RoleModule {}
