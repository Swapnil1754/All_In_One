import { AfterViewChecked, AfterViewInit, ElementRef, EventEmitter, Injector, NgZone, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { AbstractControl, ControlValueAccessor } from "@angular/forms";
import { ReCaptchaType } from "../models/recaptcha-type.enum";
import { ScriptService } from "../services/script.service";
import * as i0 from "@angular/core";
export declare abstract class BaseReCaptchaComponentDirective implements OnChanges, ControlValueAccessor, AfterViewInit, AfterViewChecked {
    protected renderer: Renderer2;
    protected zone: NgZone;
    protected injector: Injector;
    protected scriptService: ScriptService;
    /**
     * Prefix of the captcha element
     */
    protected readonly captchaElemPrefix = "ngx_captcha_id_";
    private setupCaptcha;
    /**
     * Google's site key.
     * You can find this under https://www.google.com/recaptcha
     */
    siteKey?: string;
    /**
     * Indicates if global domain 'recaptcha.net' should be used instead of default domain ('google.com')
     */
    useGlobalDomain: boolean;
    useEnterprise: boolean;
    /**
     * Type
     */
    type: "audio" | "image";
    /**
     * Language code. Auto-detects the user's language if unspecified.
     */
    hl?: string;
    /**
     * Tab index
     */
    tabIndex: number;
    /**
     * Called when captcha receives successful response.
     * Captcha response token is passed to event.
     */
    success: EventEmitter<string>;
    /**
     * Called when captcha is loaded. Event receives id of the captcha
     */
    load: EventEmitter<void>;
    /**
     * Called when captcha is reset.
     */
    reset: EventEmitter<void>;
    /**
     * Called when captcha is loaded & ready. I.e. when you need to execute captcha on component load.
     */
    ready: EventEmitter<void>;
    /**
     * Error callback
     */
    error: EventEmitter<void>;
    /**
     * Expired callback
     */
    expire: EventEmitter<void>;
    abstract captchaWrapperElem?: ElementRef;
    /**
     * Indicates if captcha should be set on load
     */
    private setupAfterLoad;
    /**
     * Captcha element
     */
    protected captchaElem?: HTMLElement;
    /**
     * Id of the captcha elem
     */
    protected captchaId?: number;
    /**
     * Holds last response value
     */
    protected currentResponse?: string;
    /**
     * If enabled, captcha will reset after receiving success response. This is useful
     * when invisible captcha need to be resolved multiple times on same page
     */
    protected resetCaptchaAfterSuccess: boolean;
    /**
     * Captcha type
     */
    protected abstract recaptchaType: ReCaptchaType;
    /**
     * Required by ControlValueAccessor
     */
    protected onChange: (value: string | undefined) => void;
    protected onTouched: (value: string | undefined) => void;
    /**
     * Indicates if captcha is loaded
     */
    isLoaded: boolean;
    /**
     * Reference to global reCaptcha API
     */
    reCaptchaApi?: any;
    /**
     * Id of the DOM element wrapping captcha
     */
    captchaElemId?: string;
    /**
     * Form Control to be enable usage in reactive forms
     */
    control?: AbstractControl | null;
    protected constructor(renderer: Renderer2, zone: NgZone, injector: Injector, scriptService: ScriptService);
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    /**
     * Gets reCaptcha properties
     */
    protected abstract getCaptchaProperties(): any;
    /**
     * Used for captcha specific setup
     */
    protected abstract captchaSpecificSetup(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Gets captcha response as per reCaptcha docs
     */
    getResponse(): string;
    /**
     * Gets Id of captcha widget
     */
    getCaptchaId(): number | undefined;
    /**
     * Resets captcha
     */
    resetCaptcha(): void;
    /**
     * Gets last submitted captcha response
     */
    getCurrentResponse(): string | undefined;
    /**
     * Reload captcha. Useful when properties (i.e. theme) changed and captcha need to reflect them
     */
    reloadCaptcha(): void;
    protected ensureCaptchaElem(captchaElemId: string): void;
    /**
     * Responsible for instantiating captcha element
     */
    protected renderReCaptcha(): void;
    /**
     * Called when captcha receives response
     * @param callback Callback
     */
    protected handleCallback(callback: any): void;
    private getPseudoUniqueNumber;
    private setupComponent;
    /**
     * Called when google's recaptcha script is ready
     */
    private onloadCallback;
    private generateNewElemId;
    private createAndSetCaptchaElem;
    /**
     * To be aligned with the ControlValueAccessor interface we need to implement this method
     * However as we don't want to update the recaptcha, this doesn't need to be implemented
     */
    writeValue(obj: any): void;
    /**
     * This method helps us tie together recaptcha and our formControl values
     */
    registerOnChange(fn: any): void;
    /**
     * At some point we might be interested whether the user has touched our component
     */
    registerOnTouched(fn: any): void;
    /**
     * Handles error callback
     */
    protected handleErrorCallback(): void;
    /**
     * Handles expired callback
     */
    protected handleExpireCallback(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseReCaptchaComponentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseReCaptchaComponentDirective, never, never, { "siteKey": "siteKey"; "useGlobalDomain": "useGlobalDomain"; "useEnterprise": "useEnterprise"; "type": "type"; "hl": "hl"; "tabIndex": "tabIndex"; }, { "success": "success"; "load": "load"; "reset": "reset"; "ready": "ready"; "error": "error"; "expire": "expire"; }, never, never, false, never>;
}
//# sourceMappingURL=base-re-captcha-component.directive.d.ts.map