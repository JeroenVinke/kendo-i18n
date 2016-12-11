import {inject, bindable} from 'aurelia-framework';
import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {I18N} from 'aurelia-i18n';

@inject(EventAggregator, Element, I18N)
export class TitleI18nCustomAttribute {

  subscription: Subscription;
  @bindable title: string;

  constructor(private ea: EventAggregator, 
              private element: Element,
              private i18n: I18N) {}

  attached() {
    this.subscription = this.ea.subscribe('i18n:locale:changed', () => { 
      this.updateColumnName();
    });
  }

  updateColumnName() {
    let columnVM = (<any>this.element).au.controller.viewModel;
    columnVM.kTitle = this.i18n.tr(this.title);
  }

  detached() {
    this.subscription.dispose();
  }
}