import { readFile, writeFile } from 'fs/promises'; // ❶ 파일을 읽고쓰는 모듈 임포트
import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common';

// 다른 import문 생략
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';




// ❷ 블로그 리포지터리 인터페이스 정의 
export interface BlogRepository {
  getAllPost(): Promise<PostDto[]>;
  createPost(postDto: PostDto);
  getPost(id: String): Promise<PostDto>;
  deletePost(id: String);
  updatePost(id: String, postDto: PostDto);
}

// ❸ BlogRepository를 구현한 클래스. 파일을 읽고 쓰기
@Injectable()
export class BlogFileRepository implements BlogRepository {
  FILE_NAME = './src/blog.data.json';
  
  // ​​❹ 파일을 읽어서 모든 게시글 불러오기
  async getAllPost(): Promise<PostDto[]> {
    const datas = await readFile(this.FILE_NAME, 'utf8');
    const posts = JSON.parse(datas);
    return posts;
  }
  // ❺ 게시글 쓰기 
  async createPost(postDto: PostDto) {
    const posts = await this.getAllPost();
    const id = posts.length + 1;
    const createPost = { id: id.toString(), ...postDto, createdDt: new Date() };
    posts.push(createPost);
    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }
  
  // ❻ 게시글 하나 가져오기 
  async getPost(id: string): Promise<PostDto> {
    const posts = await this.getAllPost();
    const result = posts.find((post) => post.id === id);
    return result;
  }
  
  // ❼ 게시글 하나 삭제 
  async deletePost(id: string) {
    const posts = await this.getAllPost();
    const filteredPosts = posts.filter((post) => post.id !== id);
    await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
  }

  // ❽ 게시글 하나 수정하기 
  async updatePost(id: string, postDto: PostDto) {
    const posts = await this.getAllPost();
    const index = posts.findIndex((post) => post.id === id);
    const updatePost = { id, ...postDto, updatedDt: new Date() };
    posts[index] = updatePost;
    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }
}

@Injectable()
export class BlogMongoRepository implements BlogRepository { // ❶ 몽고디비용 리포지터리
  // ❷ Model<BlogDocument> 타입인 blogModel 주입 
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}
  
  // ❸ 모든 게시글을 읽어오는 함수 
  async getAllPost(): Promise<Blog[]> {
    return await this.blogModel.find().exec();
  }

  // ❹ 게시글 작성
  async createPost(postDto: PostDto) {
    const createPost = {
      ...postDto,
      createdDt: new Date(),
      updatedDt: new Date(),
    };
    this.blogModel.create(createPost);
  }

  // ❺ 하나의 게시글 읽기 
  async getPost(id: string): Promise<PostDto> {
    return await this.blogModel.findById(id);
  }


  // ❻ 하나의 게시글 삭제 
  async deletePost(id: string) {
    await this.blogModel.findByIdAndDelete(id);
  }
  

 // ❼ 게시글 업데이트 
  async updatePost(id: string, postDto: PostDto) {
    const updatePost = { id, ...postDto, updatedDt: new Date() };
    await this.blogModel.findByIdAndUpdate(id, updatePost);
  }
}
