import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer' 
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('recipes')
    .pipe(map(recipeState => recipeState.recipes))
    .subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
  }

  onNew(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }
 
}
