import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("utilisateur")
export class User{

  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lastName: string;
    
    @Column()
    firstName: string;
    
    @Column()
    birthdate: Date;
    
    @Column()
    comment : string;
  
  }
  