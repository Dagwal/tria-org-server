import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Departement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true, type: 'uuid' })
  parentId?: string;

  @ManyToOne(() => Departement, (parent) => parent.children, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: 'parentId' })
  parent: Departement;

  @OneToMany(() => Departement, (child) => child.parent, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  children: Departement[];
}
