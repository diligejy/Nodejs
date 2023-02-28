import { PostDto } from './blog.model';
export interface BlogRepository {
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: PostDto): any;
    getPost(id: String): Promise<PostDto>;
    deletePost(id: String): any;
    updatePost(id: String, postDto: PostDto): any;
}
export declare class BlogFileRepository implements BlogRepository {
    FILE_NAME: string;
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: PostDto): Promise<void>;
    getPost(id: string): Promise<PostDto>;
    deletePost(id: string): Promise<void>;
    updatePost(id: string, postDto: PostDto): Promise<void>;
}
