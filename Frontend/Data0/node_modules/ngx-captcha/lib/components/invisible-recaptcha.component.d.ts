import { ElementRef, Injector, NgZone, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { ReCaptchaType } from '../models/recaptcha-type.enum';
import { ScriptService } from '../services/script.service';
import { BaseReCaptchaComponentDirective } from './base-re-captcha-component.directive';
import * as i0 from "@angular/core";
export declare class InvisibleReCaptchaComponent extends BaseReCaptchaComponentDirective implements OnChanges {
    protected renderer: Renderer2;
    protected zone: NgZone;
    protected injector: Injector;
    protected scriptService: ScriptService;
    /**
     * This size representing invisible captcha
     */
    protected readonly size = "invisible";
    /**
     * Theme
     */
    theme: 'dark' | 'light';
    /**
     * Badge
     */
    badge: 'bottomright' | 'bottomleft' | 'inline';
    captchaWrapperElem?: ElementRef;
    protected recaptchaType: ReCaptchaType;
    constructor(renderer: Renderer2, zone: NgZone, injector: Injector, scriptService: ScriptService);
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Programatically invoke the reCAPTCHA check. Used if the invisible reCAPTCHA is on a div instead of a button.
     */
    execute(): void;
    protected captchaSpecificSetup(): void;
    /**
    * Gets reCaptcha properties
    */
    protected getCaptchaProperties(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<InvisibleReCaptchaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InvisibleReCaptchaComponent, "ngx-invisible-recaptcha", never, { "theme": "theme"; "badge": "badge"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=invisible-recaptcha.component.d.ts.map