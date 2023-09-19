import { ElementRef, Injector, NgZone, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { ReCaptchaType } from '../models/recaptcha-type.enum';
import { ScriptService } from '../services/script.service';
import { BaseReCaptchaComponentDirective } from './base-re-captcha-component.directive';
import * as i0 from "@angular/core";
export declare class ReCaptcha2Component extends BaseReCaptchaComponentDirective implements OnChanges, OnDestroy {
    protected renderer: Renderer2;
    protected zone: NgZone;
    protected injector: Injector;
    protected scriptService: ScriptService;
    /**
    * Name of the global expire callback
    */
    protected readonly windowOnErrorCallbackProperty = "ngx_captcha_error_callback";
    /**
    * Name of the global error callback
    */
    protected readonly windowOnExpireCallbackProperty = "ngx_captcha_expire_callback";
    /**
     * Theme
     */
    theme: 'dark' | 'light';
    /**
    * Size
    */
    size: 'compact' | 'normal';
    captchaWrapperElem?: ElementRef;
    protected recaptchaType: ReCaptchaType;
    constructor(renderer: Renderer2, zone: NgZone, injector: Injector, scriptService: ScriptService);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    protected captchaSpecificSetup(): void;
    /**
     * Gets reCaptcha properties
    */
    protected getCaptchaProperties(): any;
    /**
     * Registers global callbacks
    */
    private registerCallbacks;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReCaptcha2Component, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReCaptcha2Component, "ngx-recaptcha2", never, { "theme": "theme"; "size": "size"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=recaptcha-2.component.d.ts.map