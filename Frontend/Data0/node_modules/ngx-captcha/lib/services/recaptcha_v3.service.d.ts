import { NgZone } from "@angular/core";
import { ScriptService } from "./script.service";
import { RecaptchaConfiguration } from "../models/recaptcha-configuration";
import * as i0 from "@angular/core";
export declare class ReCaptchaV3Service {
    protected scriptService: ScriptService;
    protected zone: NgZone;
    constructor(scriptService: ScriptService, zone: NgZone);
    /**
     * Executes reCaptcha v3/Enterprise with given action and passes token via callback. You need to verify
     * this callback in your backend to get meaningful results.
     *
     * For more information see https://developers.google.com/recaptcha/docs/v3
     * For enterprise see https://cloud.google.com/recaptcha-enterprise/docs
     *
     * @param siteKey Site key found in your google admin panel
     * @param action Action to log
     * @param callback Callback function to to handle token
     * @param config Optional configuration like useGlobalDomain to be provided
     * @param errorCallback Optional Callback function to handle errors
     */
    execute(siteKey: string, action: string, callback: (token: string) => void, config?: RecaptchaConfiguration, errorCallback?: (error: any) => void): void;
    /**
     * Executes reCaptcha v3/Enterprise with given action and returns token via Promise. You need to verify
     * this token in your backend to get meaningful results.
     *
     * For more information see https://developers.google.com/recaptcha/docs/v3
     * For enterprise see https://cloud.google.com/recaptcha-enterprise/docs
     *
     * @param siteKey Site key found in your google admin panel
     * @param action Action to log
     * @param config Optional configuration like useGlobalDomain to be provided
     */
    executeAsPromise(siteKey: string, action: string, config?: RecaptchaConfiguration): Promise<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReCaptchaV3Service, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReCaptchaV3Service>;
}
//# sourceMappingURL=recaptcha_v3.service.d.ts.map