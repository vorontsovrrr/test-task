import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  title!: string

  @IsString()
  @IsOptional()
  slug?: string

  @IsDateString()
  @IsOptional()
  date?: string

  @IsString()
  @IsOptional()
  author?: string

  @IsString()
  @IsNotEmpty()
  content!: string

  @IsBoolean()
  @IsOptional()
  isDraft?: boolean
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  slug?: string

  @IsDateString()
  @IsOptional()
  date?: string

  @IsString()
  @IsOptional()
  author?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsBoolean()
  @IsOptional()
  isDraft?: boolean
}

export interface PostOutput {
  id: number
  slug: string
  title: string
  author?: string
  date?: string
  content: string
  draft: boolean
}


