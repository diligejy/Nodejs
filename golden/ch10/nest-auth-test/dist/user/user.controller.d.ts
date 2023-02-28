import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(user: CreateUserDto): Promise<User>;
    updateUser(email: string, user: UpdateUserDto): Promise<void>;
    getUser(email: string): Promise<User>;
    deleteUser(email: string): Promise<import("typeorm").DeleteResult>;
}
