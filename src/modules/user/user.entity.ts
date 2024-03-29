import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;
}
