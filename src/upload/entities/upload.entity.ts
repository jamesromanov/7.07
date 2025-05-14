import { Model } from 'sequelize-typescript';
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { UploadAttribution } from '../interfaces/upload.attribute';

@Table({ tableName: 'uploads', timestamps: true })
export class Upload extends Model<Upload, UploadAttribution> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT })
  declare id: number;
  @Column({ type: DataType.STRING })
  declare fileName: string;
  @Column({ type: DataType.STRING })
  declare fileType: string;
  @Column({ type: DataType.STRING })
  declare url: string;
  @CreatedAt
  declare createdAt: Date;
  @UpdatedAt
  declare updatedAt: Date;
}
