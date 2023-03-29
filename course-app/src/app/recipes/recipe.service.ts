import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a simple test.', 'https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg', [new Ingredient('meat', 2), new Ingredient('salt', 1)]),
    new Recipe('A Test Recipe 2', 'This is a complex test.', 'https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-3.jpg', [new Ingredient('milk', 1), new Ingredient('eggs', 12)])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}