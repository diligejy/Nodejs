import {
    Body, Controller, Delete, Get, Param, Post, Put,
  } from '@nestjs/common';
  import { BlogService } from './blog.service'; // ❶ 블로그 서비스 임포트 
  
  @Controller('blog')
  export class BlogController {
    constructor(private blogService: BlogService) {}  // ❶ BlogService 주입 
  
    @Get() 
    getAllPosts() {                               // ❸ 모든 게시글 가져오기 
      return this.blogService.getAllPosts();
    }
  
    @Post()
    createPost(@Body() postDto) {    // ❹ 게시글 작성 
      console.log('게시글 작성');
      this.blogService.createPost(postDto);
      return 'success';
    }
  
    @Get('/:id')
    async getPost(@Param('id') id: string) {  // ❶ 비동기를 지원하는 메서드로 시그니처 변경 
      console.log('게시글 하나 가져오기');
  
      // ❷ 블로그 서비스에서 사용하는 메서드가 비동기로 변경되었으므로 await 사용
      const post = await this.blogService.getPost(id); 
      console.log(post);
      return post;
    }
  
    @Delete('/:id')
    deletePost(@Param('id') id: string) { // ❻ 게시글 삭제 
      console.log('게시글 삭제');
      this.blogService.delete(id);
      return 'success';
    }
  
    @Put('/:id')
    updatePost(@Param('id') id: string, @Body() postDto) { // ❼ 게시글 업데이트
      console.log('게시글 업데이트', id, postDto);
      return this.blogService.updatePost(id, postDto);
    }
  }
  