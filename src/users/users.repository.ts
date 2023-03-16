import { Injectable } from "@nestjs/common";
import { UserInfo } from "./UserInfo";

@Injectable()
export class UserRepository{
    memory_db: any []

    constructor(){
        this.memory_db = []
    }

    async showDb(){
        return this.memory_db;
    }

    async findOne(email: string){
        console.log(this.memory_db);
        for(const user of this.memory_db){
            if (user.email == email)
                return user;
        }
        return null;
    }

    async save(user: UserInfo){
        if(user.id == null){
            user.id = this.memory_db.length + 1;
            this.memory_db.push(user);  
        }
        this.memory_db[user.id-1] = user
    }
    
    async findOneByToken(signupVerifyToken: string){
        for(const user of this.memory_db){
            if (user.uniqueKey == signupVerifyToken)
                return user;
        }
        return null;
    }

    async findOneById(userId: number){
        for(const user of this.memory_db){
            if (user.id == userId)
                return user;
        }
        return null;
    }

    async findEmailById(userId: number){
        for(const user of this.memory_db){
            if(user.id == userId){
                return user.email;
            }
        }
        return null;
    }

}