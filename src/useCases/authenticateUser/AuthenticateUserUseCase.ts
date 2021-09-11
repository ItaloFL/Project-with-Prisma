import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

import { client } from "../../prisma/client";


interface IRequest {
  username: string
  password: string
}

export class AuthenticateUserUseCase{


  async execute({ username, password }: IRequest){

    const verifyIfUserExist = await client.user.findFirst({
      where:{
        username
      }
    })

    if(!verifyIfUserExist){
      throw new Error("Usuario ou senha incorretos!")
    }

    const passwordMatch = await compare(password, verifyIfUserExist.password)

    if(!passwordMatch){
      throw new Error("Usuario ou senha incorretos")
    }

    const token = sign({}, "4f5380730795ba59577f88dc4323fc56", {
      subject: verifyIfUserExist.id,
      expiresIn: "1d"
    })

    return { token }
  }
}