import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import * as ormconfig from './ormconfig';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(ormconfig), UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
