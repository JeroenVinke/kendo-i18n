import {inject, bindable} from 'aurelia-framework';
import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {I18N} from 'aurelia-i18n';

@inject(EventAggregator, Element, I18N)
export class GridI18nCustomAttribute {
  subscription: Subscription;

  constructor(private ea: EventAggregator, 
              private element: Element,
              private i18n: I18N) {}

  attached() {
    this.subscription = this.ea.subscribe('i18n:locale:changed', () => { 
      setTimeout(() => this.refreshGrid(), 100);
    });
  }

  refreshGrid() {
    let gridVM = (<any>this.element).au.controller.viewModel;
    let grid = gridVM.kWidget;
    let akCols = Array.prototype.slice.call(this.element.querySelectorAll('ak-col'));
    let options = grid.getOptions();

    for(let column of options.columns) {
      for(let akCol of akCols) {
        let columnVM = (<any>akCol).au.controller.viewModel;
        if (column.field === columnVM.kField) {
            column.title = columnVM.kTitle;
        }
      }
    }
   
    setTimeout(() => {
      grid.setOptions(options);
    }, 200);
  }
}