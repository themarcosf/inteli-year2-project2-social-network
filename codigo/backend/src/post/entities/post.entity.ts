import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column("simple-array")
  tags: string[];

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  saves: number;

  @Column("simple-array", { nullable: true })
  comments: string[];

  @Column({ nullable: true })
  imgURL: string;

  /** relations */
  @ManyToOne(() => User, (user) => user.posts)
  user: Promise<User>;
}
