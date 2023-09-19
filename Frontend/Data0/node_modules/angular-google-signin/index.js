"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var GoogleSignInSuccess = (function () {
    function GoogleSignInSuccess(googleUser) {
        this.googleUser = googleUser;
    }
    return GoogleSignInSuccess;
}());
exports.GoogleSignInSuccess = GoogleSignInSuccess;
var GoogleSignInFailure = (function () {
    function GoogleSignInFailure() {
    }
    return GoogleSignInFailure;
}());
exports.GoogleSignInFailure = GoogleSignInFailure;
var GoogleSignInComponent = (function () {
    function GoogleSignInComponent() {
        this.id = 'google-signin2';
        this.googleSignInSuccess = new core_1.EventEmitter();
        this.googleSignInFailure = new core_1.EventEmitter();
    }
    Object.defineProperty(GoogleSignInComponent.prototype, "width", {
        get: function () {
            return this._width.toString();
        },
        set: function (value) {
            this._width = Number(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleSignInComponent.prototype, "height", {
        get: function () {
            return this._height.toString();
        },
        set: function (value) {
            this._height = Number(value);
            gapi.load('', '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleSignInComponent.prototype, "longTitle", {
        get: function () {
            return this._longTitle.toString();
        },
        set: function (value) {
            this._longTitle = Boolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleSignInComponent.prototype, "fetchBasicProfile", {
        get: function () {
            return this._fetchBasicProfile.toString();
        },
        set: function (s) {
            this._fetchBasicProfile = Boolean(s);
        },
        enumerable: true,
        configurable: true
    });
    GoogleSignInComponent.prototype.ngAfterViewInit = function () {
        this.auth2Init();
        this.renderButton();
    };
    GoogleSignInComponent.prototype.auth2Init = function () {
        var _this = this;
        if (this.clientId == null)
            throw new Error('clientId property is necessary. (<google-signin [clientId]="..."></google-signin>)');
        gapi.load('auth2', function () {
            gapi.auth2.init({
                client_id: _this.clientId,
                cookie_policy: _this.cookiePolicy,
                fetch_basic_profile: _this._fetchBasicProfile,
                hosted_domain: _this.hostedDomain,
                openid_realm: _this.openidRealm
            });
        });
    };
    GoogleSignInComponent.prototype.handleFailure = function () {
        this.googleSignInFailure.next(new GoogleSignInFailure());
    };
    GoogleSignInComponent.prototype.handleSuccess = function (googleUser) {
        this.googleSignInSuccess.next(new GoogleSignInSuccess(googleUser));
    };
    GoogleSignInComponent.prototype.renderButton = function () {
        var _this = this;
        gapi.signin2.render(this.id, {
            scope: this.scope,
            width: this._width,
            height: this._height,
            longtitle: this._longTitle,
            theme: this.theme,
            onsuccess: function (googleUser) { return _this.handleSuccess(googleUser); },
            onfailure: function () { return _this.handleFailure(); }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GoogleSignInComponent.prototype, "scope", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GoogleSignInComponent.prototype, "width", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GoogleSignInComponent.prototype, "height", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GoogleSignInComponent.prototype, "longTitle", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GoogleSignInComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GoogleSignInComponent.prototype, "clientId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GoogleSignInComponent.prototype, "cookiePolicy", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GoogleSignInComponent.prototype, "fetchBasicProfile", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GoogleSignInComponent.prototype, "hostedDomain", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GoogleSignInComponent.prototype, "openidRealm", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], GoogleSignInComponent.prototype, "googleSignInSuccess", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], GoogleSignInComponent.prototype, "googleSignInFailure", void 0);
    GoogleSignInComponent = __decorate([
        core_1.Component({
            selector: 'google-signin',
            template: '<div [id]="id"></div>',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], GoogleSignInComponent);
    return GoogleSignInComponent;
}());
exports.GoogleSignInComponent = GoogleSignInComponent;
//# sourceMappingURL=index.js.map