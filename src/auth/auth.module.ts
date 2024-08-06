import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({

  imports: [

    ConfigModule.forRoot({ envFilePath: '.env.development' }),

    PassportModule,

    UsersModule,

    JwtModule.register({

      signOptions: { expiresIn: '60s' },

      secret: process.env.JWT_SECRET

    }),

  ],

  providers: [

    AuthResolver,

    AuthService,

    LocalStrategy,

    JwtStrategy

  ]

})
export class AuthModule { }
