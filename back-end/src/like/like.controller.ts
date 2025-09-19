import { Controller, Post, Param, Req, Get } from '@nestjs/common';
import { LikesService } from './like.service';


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
