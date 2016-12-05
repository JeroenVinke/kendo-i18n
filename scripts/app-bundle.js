var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", 'aurelia-framework', 'aurelia-i18n'], function (require, exports, aurelia_framework_1, aurelia_i18n_1) {
    "use strict";
    var App = (function () {
        function App(i18n) {
            this.i18n = i18n;
            this.datasource = {
                data: [{
                        "ProductID": 1,
                        "ProductName": "Chai",
                        "SupplierID": 1,
                        "CategoryID": 1,
                        "QuantityPerUnit": "10 boxes x 20 bags",
                        "UnitPrice": 18,
                        "UnitsInStock": 39,
                        "UnitsOnOrder": 0,
                        "ReorderLevel": 10,
                        "Discontinued": false,
                        "Category": {
                            "CategoryID": 1,
                            "CategoryName": "Beverages",
                            "Description": "Soft drinks, coffees, teas, beers, and ales"
                        }
                    },
                    {
                        "ProductID": 2,
                        "ProductName": "Chang",
                        "SupplierID": 1,
                        "CategoryID": 1,
                        "QuantityPerUnit": "24 - 12 oz bottles",
                        "UnitPrice": 19,
                        "UnitsInStock": 17,
                        "UnitsOnOrder": 40,
                        "ReorderLevel": 25,
                        "Discontinued": false,
                        "Category": {
                            "CategoryID": 1,
                            "CategoryName": "Beverages",
                            "Description": "Soft drinks, coffees, teas, beers, and ales"
                        }
                    }],
                schema: {
                    model: {
                        fields: {
                            ProductName: { type: 'string' },
                            UnitPrice: { type: 'number' },
                            UnitsInStock: { type: 'number' },
                            Discontinued: { type: 'boolean' }
                        }
                    }
                },
                pageSize: 10
            };
        }
        App.prototype.changeLanguage = function () {
            this.i18n.setLocale('de');
        };
        App = __decorate([
            aurelia_framework_1.inject(aurelia_i18n_1.I18N), 
            __metadata('design:paramtypes', [aurelia_i18n_1.I18N])
        ], App);
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('grid-i18n',["require", "exports", 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-i18n'], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, aurelia_i18n_1) {
    "use strict";
    var GridI18n = (function () {
        function GridI18n(ea, element, i18n) {
            this.ea = ea;
            this.element = element;
            this.i18n = i18n;
        }
        GridI18n.prototype.attached = function () {
            var _this = this;
            this.subscription = this.ea.subscribe('i18n:locale:changed', function () {
                console.log('UPDATE');
                _this.refreshGrid();
            });
        };
        GridI18n.prototype.refreshGrid = function () {
            var _this = this;
            this.i18n.updateTranslations(this.element);
            setTimeout(function () {
                var columnVM = _this.element.au.controller.viewModel;
                console.log(columnVM.kTitle);
                var options = _this.grid.getOptions();
                for (var _i = 0, _a = options.columns; _i < _a.length; _i++) {
                    var column = _a[_i];
                    if (column.field === columnVM.kField) {
                        column.title = columnVM.kTitle;
                    }
                }
            }, 200);
        };
        GridI18n.prototype.detached = function () {
            this.subscription.dispose();
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', kendo.ui.Grid)
        ], GridI18n.prototype, "grid", void 0);
        GridI18n = __decorate([
            aurelia_framework_1.customAttribute('grid-i18n'),
            aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator, Element, aurelia_i18n_1.I18N), 
            __metadata('design:paramtypes', [aurelia_event_aggregator_1.EventAggregator, Element, aurelia_i18n_1.I18N])
        ], GridI18n);
        return GridI18n;
    }());
    exports.GridI18n = GridI18n;
});

define('main',["require", "exports", './environment', 'i18next-xhr-backend'], function (require, exports, environment_1, Backend) {
    "use strict";
    Promise.config({
        longStackTraces: environment_1.default.debug,
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .plugin('aurelia-kendoui-bridge')
            .plugin('aurelia-i18n', function (instance) {
            instance.i18next.use(Backend);
            return instance.setup({
                backend: {
                    loadPath: './locales/{{lng}}/translation.json',
                },
                lng: 'en',
                attributes: ['t', 'i18n'],
                fallbackLng: 'en',
                debug: false
            });
        })
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"aurelia-kendoui-bridge/grid/grid\"></require>\n  <require from=\"aurelia-kendoui-bridge/grid/col\"></require>\n  <require from=\"aurelia-kendoui-bridge/button/button\"></require>\n  <require from=\"./grid-i18n\"></require>\n\n  ${'name' | t}\n  <p i18n=\"name\"></p>\n\n  <ak-grid k-data-source.bind=\"datasource\" k-widget.bind=\"_grid\">\n    <ak-col t=\"[kTitle]name\" k-field=\"ProductName\" grid-i18n=\"grid.bind: _grid\"></ak-col>\n  </ak-grid>\n  \n  <button ak-button click.delegate=\"changeLanguage()\">Change language</button>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map