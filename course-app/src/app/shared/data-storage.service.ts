import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://angular-course-project-71ac9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://angular-course-project-71ac9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            if( !recipe.ingredients) {
              recipe.ingredients = [];
            }
            return recipe;
          })
        }),
        tap<Recipe[]>(recipes => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }
}