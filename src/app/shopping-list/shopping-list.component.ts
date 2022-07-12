import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private onSubscription: Subscription;
  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients()
    this.onSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      })

    this.loggingService.printLog("Hello from ShoppingListComponent ngOninit")
  }

  onEditItem(index: number) {
    this.shoppingListService.startEditing.next(index);
  }

  ngOnDestroy(): void {
      this.onSubscription.unsubscribe();
  }

}
