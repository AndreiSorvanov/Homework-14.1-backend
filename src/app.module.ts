import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [InMemoryDBModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
