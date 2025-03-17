import { PartialType } from '@nestjs/mapped-types';
import { CreateTimecardDto } from './create-timecard.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTimecardDto extends PartialType(CreateTimecardDto) {
    @IsString({ message: 'Description must be a string.' })
    @IsOptional()
    description: string;
}
