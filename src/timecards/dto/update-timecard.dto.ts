import { PartialType } from '@nestjs/mapped-types';
import { CreateTimecardDto } from './create-timecard.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTimecardDto extends PartialType(CreateTimecardDto) {
    @IsString({ message: 'Description must be a string.' })
    @IsOptional()
    description: string;

    @IsString({ message: 'Title must be a string.' })
    @IsOptional()
    title: string;

    @IsInt({ message: 'User ID must be an integer.' })
    @IsOptional()
    userId: number;
}
