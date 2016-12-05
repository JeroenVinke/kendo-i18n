import {customAttribute, inject, bindable} from 'aurelia-framework';
import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {I18N} from 'aurelia-i18n';

@customAttribute('grid-i18n')
@inject(EventAggregator, Element, I18N)
export class GridI18n {

  subscription: Subscription;
  @bindable grid: kendo.ui.Grid;

  constructor(private ea: EventAggregator, 
              private element: Element,
              private i18n: I18N) {}

  attached() {
    this.subscription = this.ea.subscribe('i18n:locale:changed', () => { 
      console.log('UPDATE');
      this.refreshGrid();
    });
  }

  refreshGrid() {
    this.i18n.updateTranslations(this.element);

    setTimeout(() => {
 let columnVM = (<any>this.element).au.controller.viewModel;
    console.log(columnVM.kTitle);
    
    // let grid: kendo.ui.Grid = gridVM.kWidget;
    // console.log(columnVM);
    
    let options = this.grid.getOptions();

    for(let column of options.columns) {
      if (column.field === columnVM.kField) {
        column.title = columnVM.kTitle;
      }
    }
    }, 200)
   
    // setTimeout(() => {
    // this.grid.setOptions(options);
    // }, 200);
  }

  detached() {
    this.subscription.dispose();
  }
}