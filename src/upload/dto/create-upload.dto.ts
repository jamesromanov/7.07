import { ApiProperty } from '@nestjs/swagger';

export class CreateUploadDto {
  file: any;
}
export class GetImageDto {
  @ApiProperty({ type: 'string' })
  url: string;
}
