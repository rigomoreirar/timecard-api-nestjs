import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

export class CreateEntryDto {
    @IsInt({ message: 'Timecard ID must be an integer.' })
    @IsOptional()
    timecardId: number;

    @IsString({ message: 'Task must be a string.' })
    @IsNotEmpty({ message: 'Task is required.' })
    task: string;

    @IsString({ message: 'Optional details must be a string.' })
    @IsOptional()
    optionalDetails: string;
}
