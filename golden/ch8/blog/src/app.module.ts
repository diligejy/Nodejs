import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { BlogFileRepository, BlogMongoRepository } from './blog.repository';
import { Blog, BlogSchema } from './blog.schema';
import { BlogService } from './blog.service';

@Module({
  imports: [
    // ❶ 몽고디비 연결 설정
    MongooseModule.forRoot(
      'mongodb+srv://mymongo:<패스워드>@cluster0.c4xru.mongodb.net/blog',
    ),
     // ❷ 몽고디비 스키마 설정
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  // ❸ 프로바이더 설정 
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
