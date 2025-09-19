import { Controller, Post, Param, Get, UseGuards } from '@nestjs/common';
import { LikesService } from './like.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':postId/:userId')
  async toggleLike(
    @Param('postId') postId: number,
    @Param('userId') userId: number
  ) {
    return this.likesService.toggleLike(userId, postId);
  }

  @Get(':postId/:userId/check')
  async checkLike(
    @Param('postId') postId: number,
    @Param('userId') userId: number
  ) {
    return this.likesService.hasUserLiked(userId, postId);
  }
}
