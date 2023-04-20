import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PurchaseEntity } from './purchase.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { readJsonSync } from 'fs-extra';

@Controller()
export class AppController {
  constructor(private dbService: InMemoryDBService<any>) {
    const data = readJsonSync('./db/db.json');
    this.dbService.createMany(data);
  }

  @Get()
  getAll(): PurchaseEntity[] {
    return this.dbService.getAll();
  }

  @Post()
  create(@Body() dto: Partial<PurchaseEntity>): PurchaseEntity {
    return this.dbService.create(dto);
  }

  @Post('seed')
  seed(): PurchaseEntity[] {
    this.dbService.seed(
      (idx: number) => ({
        id: String(idx + 1),
        title: `Purchase-${idx + 1}`,
        price: idx + 1 + 10,
        date: new Date(),
        comment: `Comment-${idx + 1}`,
      }),
      5,
    );

    return this.dbService.getAll();
  }

  @Put()
  update(@Body() dto: Partial<PurchaseEntity>): void {
    return this.dbService.update(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.dbService.delete(id);
  }
}
