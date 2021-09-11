import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

  const authToken = request.headers.authorization

  if(!authToken){
    return response.status(401).json({
      message: "Sem autorização!"
    })
  }

  const [, token] = authToken.split(" ")

  try {
    verify(token, "4f5380730795ba59577f88dc4323fc56")

    return next()
  } catch (error) {
    return response.status(401).json({
      message: "Sem autorização!"
    })
  }



}