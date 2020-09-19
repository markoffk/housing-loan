import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'loan_config' })
export class LoanConfigEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  systemName: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'double precision' })
  interest: number;
}
