import { PartialType } from '@nestjs/mapped-types';
import { CreateEntryDto } from './create-entry.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEntryDto extends PartialType(CreateEntryDto) {
    @IsString({ message: 'Task must be a string.' })
    @IsOptional()
    task: string;
}
