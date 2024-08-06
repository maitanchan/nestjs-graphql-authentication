import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import * as bycrypt from 'bcrypt';
import { RegisterUserInput } from './dto/register-user.input';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {

        const user = this.userService.getUser(username)

        const comparePassword = await bycrypt.compare(password, user?.password)

        if (user && comparePassword) {

            return user

        }

        const { password: userPassword, ...others } = user

        return others

    }

    async login(user: User) {

        const token = this.jwtService.sign({ username: user.username, id: user.id })

        return {

            access_token: token,

            user

        }

    }

    async register(registerUserInput: RegisterUserInput) {

        const user = this.userService.getUser(registerUserInput.username)

        if (user) {

            throw new Error("User already exists")

        }

        const password = await bycrypt.hash(registerUserInput.password, 10)

        return this.userService.createUser({ ...registerUserInput, password })

    }

}
