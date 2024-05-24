import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './entities/store.entity';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class StoreService {

  constructor(
    @InjectModel(Store.name)
    private readonly storeModel: Model<Store>
  ){}

  async create(createStoreDto: CreateStoreDto) {
    try {
      const part = await this.storeModel.create(createStoreDto);
      return part
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offSet = 0 } = paginationDto;

    let part: Store[] = await this.storeModel.find()
      .limit(limit)
      .skip(offSet)
      .sort({ printerSerie: 1 })
      
    return { part, paginationDto }
  }

  async findOne(id: string) {
    let part: Store;
    part = await this.storeModel.findById(id);
    if (!part) throw new NotFoundException(`Part not found`)
    return part;
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    const part = await this.storeModel.findById(id);
    try {
      await part.updateOne(updateStoreDto, { new: true })
      return { ...part.toJSON(), ...updateStoreDto }
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.storeModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new BadRequestException(`Part with id ${id} not found`);
    return
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Part not found`)
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create Part`)
  }
}
