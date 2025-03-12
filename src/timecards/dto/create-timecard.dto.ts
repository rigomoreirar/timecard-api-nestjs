import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateTimecardDto {
    @IsInt({ message: 'User ID must be an integer.' })
    @IsNotEmpty({ message: 'User ID is required.' })
    userId: number;

    @IsString({ message: 'Title must be a string.' })
    @IsNotEmpty({ message: 'Title is required.' })
    title: string;

    @IsString({ message: 'Description must be a string.' })
    @IsNotEmpty({ message: 'Description is required.' })
    description: string;
}
