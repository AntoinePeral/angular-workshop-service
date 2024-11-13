import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Article } from '../common/article';
import { ArticleService } from '../common/article.service';

@Component({
  selector: 'app-articles-list-deleted',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles-list-deleted.component.html',
  styleUrl: './articles-list-deleted.component.css'
})
export class ArticlesListDeletedComponent {
  // Liste des articles non disponnible
  articlesDeleted!: Article[];
  // Injection de service
  private articleService = inject(ArticleService)

  ngOnInit() {
    // TODO récupération des articles non disponible à partir d'un service
    this.articlesDeleted = this.articleService.getDeletedArticles();
  }

  /**
   * Restaure un article supprimé
   */
  restore(article: Article) {
    // TODO restauration de l'article à partir d'un service
    this.articleService.restoreDeletedArticle(article);
  }
}
