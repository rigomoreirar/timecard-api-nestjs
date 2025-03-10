import { PartialType } from '@nestjs/mapped-types';
import { CreateEntryDto } from './create-entry.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEntryDto extends PartialType(CreateEntryDto) {
    @IsOptional()
    @IsString()
    task: string;
}
