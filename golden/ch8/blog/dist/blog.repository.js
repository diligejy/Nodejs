"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogFileRepository = void 0;
const promises_1 = require("fs/promises");
const common_1 = require("@nestjs/common");
let BlogFileRepository = class BlogFileRepository {
    constructor() {
        this.FILE_NAME = './src/blog.data.json';
    }
    async getAllPost() {
        const datas = await (0, promises_1.readFile)(this.FILE_NAME, 'utf8');
        const posts = JSON.parse(datas);
        return posts;
    }
    async createPost(postDto) {
        const posts = await this.getAllPost();
        const id = posts.length + 1;
        const createPost = Object.assign(Object.assign({ id: id.toString() }, postDto), { createdDt: new Date() });
        posts.push(createPost);
        await (0, promises_1.writeFile)(this.FILE_NAME, JSON.stringify(posts));
    }
    async getPost(id) {
        const posts = await this.getAllPost();
        const result = posts.find((post) => post.id === id);
        return result;
    }
    async deletePost(id) {
        const posts = await this.getAllPost();
        const filteredPosts = posts.filter((post) => post.id !== id);
        await (0, promises_1.writeFile)(this.FILE_NAME, JSON.stringify(filteredPosts));
    }
    async updatePost(id, postDto) {
        const posts = await this.getAllPost();
        const index = posts.findIndex((post) => post.id === id);
        const updatePost = Object.assign(Object.assign({ id }, postDto), { updatedDt: new Date() });
        posts[index] = updatePost;
        await (0, promises_1.writeFile)(this.FILE_NAME, JSON.stringify(posts));
    }
};
BlogFileRepository = __decorate([
    (0, common_1.Injectable)()
], BlogFileRepository);
exports.BlogFileRepository = BlogFileRepository;
//# sourceMappingURL=blog.repository.js.map