import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>()
    
    constructor(private shoppingListService: ShoppingListService) {}
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Test Recipe', 
    //         'This is simply a test', 
    //         'https://www.saveur.com/uploads/2020/11/20/Y7RZPFZEERAZVHJ2VHC2RXMEEY.jpg?quality=85&width=540',
    //         [new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 1)]),
    //     new Recipe(
    //         'Another Test Recipe', 
    //         'This is simply another test', 
    //         'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    //         [new Ingredient('Grilled chicken', 1),
    //         new Ingredient('French Fries', 20)])
    // ];

    private recipes: Recipe[] = [];

    setRecipes(recipes : Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice()
    }

    addToShoppingListService(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
    getRecipe(id: number) {
        return this.recipes.slice()[id]
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}