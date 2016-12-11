import {inject} from 'aurelia-framework';
import {EventAggregator, Subscription} from 'aurelia-event-aggregator';

@inject(EventAggregator, Element)
export class GridI18nCustomAttribute {
  subscription: Subscription;

  constructor(private ea: EventAggregator, 
              private element: Element) {}

  attached() {
    this.subscription = this.ea.subscribe('i18n:locale:changed', () => {
      // delay so that i18n can update the column name
      setTimeout(() => this.refreshGrid(), 100);
    });
  }

  refreshGrid() {
    let gridVM = (<any>this.element).au.controller.viewModel;
    let grid = gridVM.kWidget;

    // get the options from the ak-grid wrapper
    var wrapperOptions = gridVM.widgetBase._getOptions(gridVM.element);
    gridVM._beforeInitialize(wrapperOptions);

    // get the options from the grid instance
    let gridOptions = grid.getOptions();

    // update the column names on these options
    for(let wrapperColumn of wrapperOptions.columns) {
      for(let gridColumn of gridOptions.columns) {
        if (gridColumn.field === wrapperColumn.field) {
            gridColumn.title = wrapperColumn.title;
        }
      }
    }
   
    // set the updated options on the grid
    grid.setOptions(gridOptions);
  }

  detached() {
    this.subscription.dispose();
  }
}