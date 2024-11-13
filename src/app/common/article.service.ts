import { Injectable } from '@angular/core';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: Article[];
  deletedArticles:Article[];

  constructor() {this.articles = this.getFromLocalStorage(), this.deletedArticles = this.getDeletedFromLocalStorage()}

  getPublishedArticles(){
    return this.articles;
  }
  
  getDeletedArticles(){
    return this.deletedArticles;
  }

    //Création d'un nouvel article et ajout au tableau
  createArticle(article: Article) {
    // Ajout de l'article à la liste des articles
    this.articles.push(article);
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }

  // Suppression d'un article
  deleteArticle(article: Article) {
    // Récupération de l'index de l'article à supprimer
    const index = this.articles.findIndex((x) => x.id === article.id);
    // Ajout des articles à la liste des articles supprimés
    this.deletedArticles.push(article);
    // Création du localStorage 'deletedArticles'
    localStorage.setItem('deletedArticles', JSON.stringify(this.deletedArticles))
    // Suppression de l'article du tableau 'articles'
    this.articles.splice(index, 1);
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }

  // restaure un article supprimé
  restoreDeletedArticle(article:Article){
    const index = this.deletedArticles.findIndex(x => x.id === article.id);
    this.articles.push(article);
    // Update du localStorage 'articles'
    localStorage.setItem('articles', JSON.stringify(this.articles))
    // Suppression de l'article du tableau des 'deletedArticles'
    this.deletedArticles.splice(index, 1);
    localStorage.setItem('deletedArticles', JSON.stringify(this.deletedArticles));
    
  }

  /**
   * Récupération du tableau d'articles stocké dans le local storage
   */
  getFromLocalStorage(): Article[] {
    // Récupération des articles en format 'string'
    const stringData = localStorage.getItem('articles');
    // Conversion des données de type 'string' en objet Json
    const articles: Article[] = JSON.parse(stringData || '[]');
    return articles;
  }

  /**
   * Récupération du tableau d'articles stocké dans le local storage
   */
  getDeletedFromLocalStorage(): Article[] {
    // Récupération des articles supprimés en format 'string'
    const stringData = localStorage.getItem('deletedArticles');
    // Conversion des données de type 'string' en objet Json
    const articles: Article[] = JSON.parse(stringData || '[]');
    return articles;
  }
}
