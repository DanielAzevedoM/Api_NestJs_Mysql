import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { LocalStrategy } from 'src/services/auth/local.strategy';
import { UserModule } from '../user/user.module';




@Module({
    imports: [ UserModule ] ,
    providers: [ AuthService, LocalStrategy ],
    exports: []    
  })
  export class AuthModule {}

  //TypeOrmModule.forFeature([User, Person])