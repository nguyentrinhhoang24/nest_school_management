import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './schemas/news.schema';
import { CreateNewsDto } from './dto/createnews.dto';
import { UpdateNewsDto } from './dto/updatenews.dto';
import { Branch } from 'src/branch/schemas/branch.schema';

@Injectable()
export class NewsService {
    constructor(
      @InjectModel('news') private newsModel: Model<News>,
      @InjectModel('branch') private branchModel: Model<Branch>,
    ) {}

    async findAll(): Promise<News[]> {
        const news = await this.newsModel.find();
        return news;
     }
    
      async create(createNewsDto: CreateNewsDto): Promise<News> {
        const branch = await this.branchModel.findById(createNewsDto.branch_id);
        if (!branch) {
          throw new NotFoundException('Branch not found.');
        }
        const news = await this.newsModel.create(createNewsDto);
        await this.branchModel.updateOne(
          { _id: branch._id },
          { $push: { news_id: news._id } }
        )
        return news;
      }

      async findByBranchId(branch_id: string): Promise<News[]> {
        const news = await this.newsModel.find({ branch_id: branch_id });
        return news;
      }

      async findByTag(tag_id: string): Promise<News[]> {
        const news = await this.newsModel.find({ tag_id: tag_id }).exec();
        return news;
      }
    
      async findById(id: string): Promise<News> {
        const news = await this.newsModel.findById(id);
        if (!news) {
          throw new NotFoundException('News not found.');
        }
        return news;
      }
    
      async updateById(id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
        return await this.newsModel.findByIdAndUpdate(id, updateNewsDto, {
          new: true,
          runValidators: true,
        });
      }
    
      async deleteById(id: string): Promise<News> {
        const news = await this.newsModel.findById(id);
        if (!news) {
        throw new NotFoundException('news not found.');
        }
        await this.branchModel.findByIdAndUpdate(
        news.branch_id,
        { $pull: { news_id: id } },
        { new: true }
        )
        return await this.newsModel.findByIdAndDelete(id);
      }
    
}
