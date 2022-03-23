import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async () =>
      Object.assign(await getConnectionOptions(), {
        autoLoadEntities: false,
      }),
  }), 
  UserModule, 
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
