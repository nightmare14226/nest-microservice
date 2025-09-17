import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateArticleDto } from './dto/create.article.dto';

@Injectable()
export class ArticleService {
    constructor(private prismaService: PrismaService) { }

    createArticle(article: CreateArticleDto) {
        return this.prismaService.article.create({ data: { ...article, authorId: Number(article.authorId) } })
    }

    editArticle(id: number, article: Partial<CreateArticleDto>) {
        const { authorId } = article;
        return this.prismaService.article.update({
            where: { id },
            data: { ...article, authorId: authorId ? Number(authorId) : undefined }
        })
    }

    deleteArticle(id: number) {
        return this.prismaService.article.delete({ where: { id } });
    }

    viewArticle(cond?: Partial<CreateArticleDto>) {
        const authorId = cond ? cond.authorId : undefined;
        if (!cond) return this.prismaService.article.findMany();
        return this.prismaService.article.findMany({
            where: { ...cond, authorId: authorId ? Number(authorId) : undefined },
            select: { id: true, title: true, content: true, author: { select: { name: true, email: true } } }
        });
    }
}
