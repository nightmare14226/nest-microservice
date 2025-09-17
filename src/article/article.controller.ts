import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create.article.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from './article.permission.guard';
import { Permission } from './article.permission.deco';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService ) {}

    @UseGuards(AuthGuard('jwt'), PermissionGuard)
    @Permission("viewer")
    @Post()
    get(@Body() cond: CreateArticleDto) {
        return this.articleService.viewArticle(cond);
    }

    @Post("create")
    create(@Body() article: CreateArticleDto) {
        return this.articleService.createArticle(article);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.articleService.deleteArticle(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() article: Partial<CreateArticleDto>) {
        return this.articleService.editArticle(id, article);
    }
}
