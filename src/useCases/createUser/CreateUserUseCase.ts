import { hash } from "bcryptjs";
import { client } from "../../prisma/client";


interface IUserRequest{
  name: string
  username: string
  password: string
}

export class CreateUserUseCase{

  async execute({ name, username, password }: IUserRequest){

    const verifyIfUserExist = await client.user.findFirst({
      where:{
        username
      }
    })

    if(verifyIfUserExist){
      throw new Error("Usuario já cadastrado, tente novamente com outras credenciais.")
    }

    const passwordHash = await hash(password, 8)

    const user = await client.user.create({
      data:{
        name,
        username,
        password: passwordHash
      }
    })

    return user

  }
}