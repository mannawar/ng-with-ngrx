import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducer'
import * as ShoppingListActions from "./store/shopping-list.actions";
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}> ;
  private onSubscription: Subscription;
  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
   this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients()
    // this.onSubscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
      // })

    this.loggingService.printLog("Hello from ShoppingListComponent ngOninit")
  }

  onEditItem(index: number) {
    // this.shoppingListService.startEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }

  ngOnDestroy(): void {
      // this.onSubscription.unsubscribe();
  }

}
