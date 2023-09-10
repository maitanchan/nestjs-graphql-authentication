import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {

  private readonly users = [

    {
      id: 1,
      username: 'marios',
      password: 'notpass'
    },

    {
      id: 2,
      username: 'maria',
      password: 'notpass'
    }

  ]

  createUser(createUserInput: CreateUserInput) {

    const user = {

      id: this.users.length + 1,
      ...createUserInput

    }

    this.users.push(user)

    return user

  }

  getAllUsers() {

    return this.users

  }

  getUser(username: string) {

    return this.users.find(user => user.username === username)

  }


}
