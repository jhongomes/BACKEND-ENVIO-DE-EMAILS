import { Request, Response } from "express";
import {getCustomRepository, getRepository } from 'typeorm';
import UserRepository from "../repositories/UserRepository";
class UserController {

    async create(request: Request, response:Response){
      const { name, email } = request.body;


      const usersRepository = getCustomRepository(UserRepository);

      const userAlreadExists = await usersRepository.findOne({
          email,
      })

   

      if(userAlreadExists){
           return response.status(400).json({
               error: "User alread exists!"
           })
      }


      const user = usersRepository.create({
          name,
          email
      })

      await usersRepository.save(user);

      return response.status(201).json(user);

    }

}
export default UserController;