import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../common/article';
import { ArticleService } from '../common/article.service';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.css'
})
export class ArticlesListComponent {
// Modèle de donnée d'un article et initialisation du modèle de donnée
article: Article = {
  id: '',
  name: '',
  price: '',
  contact: '',
  stock: '',
};
// Liste des articles disponibles
articles!: Article[];

// Injection de dépendance 
//2 choix
private articleService = inject(ArticleService);
// constructor(private articleService: ArticleService){
// }

ngOnInit() {
  // Récupération des articles à partir du local storage
  this.articles = this.articleService.getPublishedArticles();
}

//Création d'un nouvel article et ajout au tableau
createArticle(article: Article) {
  // appel de la method pour créer un article 
  this.articleService.createArticle(article);
  this.articles = this.articleService.getPublishedArticles()

  // Réinitialisation du modèle
  this.article = {
    id: '',
    name: '',
    price: '',
    contact: '',
    stock: '',
  };
}

// Suppression d'un article
deleteArticle(article: Article) {
  this.articleService.deleteArticle(article);
}

}
