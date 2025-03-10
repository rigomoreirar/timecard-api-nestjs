import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

export class CreateEntryDto {
    @IsInt()
    @IsOptional()
    timecardId: number;

    @IsString()
    @IsNotEmpty()
    task: string;

    @IsOptional()
    @IsString()
    optionalDetails: string;
}
