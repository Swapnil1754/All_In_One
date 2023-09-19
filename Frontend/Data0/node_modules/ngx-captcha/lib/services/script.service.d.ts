import { NgZone } from "@angular/core";
import { RecaptchaConfiguration } from "../models/recaptcha-configuration";
import * as i0 from "@angular/core";
export declare class ScriptService {
    protected zone: NgZone;
    private readonly scriptElemId;
    /**
     * Name of the global google recaptcha script
     */
    protected readonly windowGrecaptcha = "grecaptcha";
    /**
     * Name of enterpise property in the global google recaptcha script
     */
    protected readonly windowGrecaptchaEnterprise = "enterprise";
    /**
     * Name of the global callback
     */
    protected readonly windowOnLoadCallbackProperty = "ngx_captcha_onload_callback";
    /**
     * Name of the global callback for enterprise
     */
    protected readonly windowOnLoadEnterpriseCallbackProperty = "ngx_captcha_onload_enterprise_callback";
    protected readonly globalDomain: string;
    protected readonly defaultDomain: string;
    protected readonly enterpriseApi: string;
    protected readonly defaultApi: string;
    constructor(zone: NgZone);
    registerCaptchaScript(config: RecaptchaConfiguration, render: string, onLoad: (grecaptcha: any) => void, language?: string): void;
    cleanup(): void;
    /**
     * Indicates if google recaptcha script is available and ready to be used
     */
    private grecaptchaScriptLoaded;
    /**
     * Gets global callback name
     * @param useEnterprise Optional flag for enterprise script
     * @private
     */
    private getCallbackName;
    /**
     * Gets language param used in script url
     */
    private getLanguageParam;
    /**
     * Url to google api script
     */
    private getCaptchaScriptUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScriptService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScriptService>;
}
//# sourceMappingURL=script.service.d.ts.map