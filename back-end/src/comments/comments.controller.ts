import { Controller, Post, Body, Patch } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Get, Param } from '@nestjs/common';
import { ComentarPostDto } from './dto/comentar-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly postsService: CommentsService) {}

  @Get(':id')
  getCommentsByPost(@Param('id') id: string) {
    return this.postsService.buscarComentariosPorPost(+id);
  }

  @Post(':postId')
  createComment(
    @Param('postId') postId: string,
    @Body() comentarPostDto: ComentarPostDto,
  ) {
    return this.postsService.crearComentario(
      +postId,
      comentarPostDto.userId,
      comentarPostDto.comments,
    );
  }

  @Patch('like/:commentId')
  likeComment(@Param('commentId') commentId: string) {
    return this.postsService.darLikeComentario(+commentId);
  }
}
