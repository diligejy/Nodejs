import { PostDto } from './blog.model';
import { BlogFileRepository } from './blog.repository';
export declare class BlogService {
    private blogRepository;
    constructor(blogRepository: BlogFileRepository);
    getAllPosts(): Promise<PostDto[]>;
    createPost(postDto: PostDto): void;
    getPost(id: any): Promise<PostDto>;
    delete(id: any): void;
    updatePost(id: any, postDto: PostDto): void;
}
