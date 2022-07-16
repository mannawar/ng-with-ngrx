import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ShoppingListActions from '../store/shopping-list.actions'
import { Ingredient } from '../../shared/ingredient.model';
import * as fromApp from '../../store/app.reducer'


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slform: NgForm;
  subscription: Subscription
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateDataFromReducer => {
      if (stateDataFromReducer.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateDataFromReducer.editedIngredient;
        this.slform.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
      else {
        this.editMode = false;
      }
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value
    console.log(value)
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
    }
    else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
      // this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
  }

  onClear(){
    this.editMode= false;
    this.slform.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }
}
