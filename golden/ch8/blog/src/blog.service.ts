import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common';

// ❶ 리포지터리 클래스와 인터페이스 임포트
import { BlogFileRepository, BlogRepository } from './blog.repository'; 

import { BlogMongoRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(private blogRepository: BlogMongoRepository) {}

  
  
  // ❸ 모든 게시글 가져오기 
  async getAllPosts() {
    return await this.blogRepository.getAllPost();
  }
  
  // ❹ 게시글 작성 
  createPost(postDto: PostDto) {
    this.blogRepository.createPost(postDto);
  }

  // ❺ 게시글 하나 가져오기  
  async getPost(id): Promise<PostDto> {
    return await this.blogRepository.getPost(id);
  }

  // ❻ 게시글 삭제 
  delete(id) {
    this.blogRepository.deletePost(id);
  }

  // ❼ 게시글 수정 
  updatePost(id, postDto: PostDto) {
    this.blogRepository.updatePost(id, postDto);
  }
}
