import {Component, OnInit} from '@angular/core';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {AppConfig} from'./demo/domain/appconfig';
import {ConfigService} from './demo/service/app.config.service';
import {Subscription} from 'rxjs';
@Component({
    selector: 'app-config',
    template: `
        <div class="layout-config" [ngClass]="{'layout-config-active': appMain.configActive}" (click)="appMain.onConfigClick($event)">
            <a style="cursor: pointer" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
                <i class="pi pi-cog"></i>
            </a>
            <a style="cursor: pointer" class="layout-config-close" (click)="onConfigCloseClick($event)">
                <i class="pi pi-times"></i>
            </a>
            <div class="layout-config-content">
                <div>
                    <h5>Theme Customization</h5>
                    <span>Avalon offers different themes for layout, topbar, menu etc.</span>
                </div>

                <h6>Layout Color Mode</h6>
                <div class="grid">
                    <div class="col-6">
                        <div class="field-radiobutton">
                            <p-radioButton inputId="dark" name="layoutColor" value="dark" [(ngModel)]="app.layoutColor" (onClick)="onLayoutColorChange($event, 'dark')"></p-radioButton>
                            <label for="dark">Dark</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="field-radiobutton">
                            <p-radioButton inputId="light" name="layoutColor" value="light" [(ngModel)]="app.layoutColor" (onClick)="onLayoutColorChange($event, 'light')"></p-radioButton>
                            <label for="light">Light</label>
                        </div>
                    </div>
                </div>

                <h6 style="margin-top: 0;">Menu Color Mode</h6>
                <div class="grid">
                    <div class="col-6">
                        <div class="field-radiobutton">
                            <p-radioButton inputId="dark" name="menuColor" [value]="true" [(ngModel)]="app.darkMenu"
                                           [disabled]="app.layoutColor === 'dark'" [style]="{'cursor': app.layoutColor === 'dark' ? 'default' : 'pointer'}"></p-radioButton>
                            <label for="dark">Dark</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="field-radiobutton">
                            <p-radioButton inputId="light" name="menuColor" [value]="false" [(ngModel)]="app.darkMenu"
                                           [disabled]="app.layoutColor === 'dark'" [style]="{'cursor': app.layoutColor === 'dark' ? 'default' : 'pointer'}"></p-radioButton>
                            <label for="light">Light</label>
                        </div>
                    </div>
                </div>

                <h6 style="margin-top: 0;">Menu Mode</h6>
                <div class="grid">
                    <div class="col-6">
                        <div class="field-radiobutton">
                            <p-radioButton inputId="static" name="layoutMode" value="static" [(ngModel)]="app.layoutMode"></p-radioButton>
                            <label for="static">Static</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="field-radiobutton">
                            <p-radioButton inputId="overlay" name="layoutMode" value="overlay" [(ngModel)]="app.layoutMode"></p-radioButton>
                            <label for="overlay">Overlay</label>
                        </div>
                    </div>
                </div>
                <div class="grid">
                    <div class="col-6">
                        <div class="field-radiobutton">
                            <p-radioButton inputId="horizontal" name="layoutMode" value="horizontal" [(ngModel)]="app.layoutMode" (onClick)="app.profileMode = 'top'"></p-radioButton>
                            <label for="horizontal">Horizontal</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="field-radiobutton">
                            <p-radioButton inputId="slim" name="layoutMode" value="slim" [(ngModel)]="app.layoutMode"></p-radioButton>
                            <label for="slim">Slim</label>
                        </div>
                    </div>
                </div>

                <h6 style="margin-top: 0;">User Profile Mode</h6>
                <div class="grid">
                    <div class="col-6">
                        <div class="field-radiobutton">
                            <p-radioButton inputId="inline" name="profileMode" value="inline" [(ngModel)]="app.profileMode"[disabled]="appMain.isHorizontal()"></p-radioButton>
                            <label for="inline">Inline</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="field-radiobutton">
                            <p-radioButton inputId="top" name="profileMode" value="top" [(ngModel)]="app.profileMode" [disabled]="appMain.isHorizontal()"></p-radioButton>
                            <label for="top">Overlay</label>
                        </div>
                    </div>
                </div>

                <h6 style="margin-top: 0">Input Background</h6>
                <div class="formgroup-inline">
                    <div class="field-radiobutton">
                        <p-radioButton inputId="input_outlined" name="inputstyle" [(ngModel)]="app.inputStyle"  value="outlined"></p-radioButton>
                        <label for="input_outlined">Outlined</label>
                    </div>
                    <div class="field-radiobutton">
                        <p-radioButton inputId="input_filled" name="inputstyle" [(ngModel)]="app.inputStyle" value="filled"></p-radioButton>
                        <label for="input_filled">Filled</label>
                    </div>
                </div>

                <h6 style="margin-top: 0;">Ripple Effect</h6>
                <p-inputSwitch [ngModel]="app.ripple" (onChange)="appMain.onRippleChange($event)"></p-inputSwitch>

                <h6>Flat Layout Colors</h6>
                <div class="layout-themes">
                    <div *ngFor="let flatLayoutColor of flatLayoutColors">
                        <a style="cursor: pointer" (click)="changeLayout(flatLayoutColor.file)"  [ngStyle]="{'background-color': flatLayoutColor.color}">
                            <i class="pi pi-check" *ngIf="layout === flatLayoutColor.file"
                               [style]="{'color': flatLayoutColor.file==='orange' || flatLayoutColor.file==='yellow'
                               || flatLayoutColor.file==='cyan' || flatLayoutColor.file==='teal' ? '#1b1b1c' : 'var(--primary-color-text)' }"></i>
                        </a>
                    </div>
                </div>

                <h6>Component Themes</h6>
                <div class="layout-themes">
                    <div *ngFor="let t of themes">
                        <a style="cursor: pointer" (click)="changeComponentTheme(t.file)" [ngStyle]="{'background-color': t.color}">
                            <i class="pi pi-check" *ngIf="themeColor === t.file"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AppConfigComponent implements OnInit {

    themes: any[];

    flatLayoutColors: any[];

    themeColor = 'purple';

    layout = 'purple';
    
    config: AppConfig;

    subscription: Subscription;

    constructor(public app: AppComponent, public appMain: AppMainComponent, public configService: ConfigService) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
        });

        this.flatLayoutColors = [
            {name: 'Blue', file: 'blue', color: '#0d6efd'},
            {name: 'Indigo', file: 'indigo', color: '#6610f2'},
            {name: 'Purple', file: 'purple', color: '#6f42c1'},
            {name: 'Pink', file: 'pink', color: '#d63384'},
            {name: 'Orange', file: 'orange', color: '#fd7e14'},
            {name: 'Yellow', file: 'yellow', color: '#ffc107'},
            {name: 'Green', file: 'green', color: '#198754'},
            {name: 'Teal', file: 'teal', color: '#20c997'},
            {name: 'Cyan', file: 'cyan', color: '#0dcaf0'},
        ];
        this.themes = [
            {name: 'Blue', file: 'blue', color: '#0d6efd'},
            {name: 'Indigo', file: 'indigo', color: '#6610f2'},
            {name: 'Purple', file: 'purple', color: '#6f42c1'},
            {name: 'Pink', file: 'pink', color: '#d63384'},
            {name: 'Orange', file: 'orange', color: '#fd7e14'},
            {name: 'Yellow', file: 'yellow', color: '#ffc107'},
            {name: 'Green', file: 'green', color: '#198754'},
            {name: 'Teal', file: 'teal', color: '#20c997'},
            {name: 'Cyan', file: 'cyan', color: '#0dcaf0'},
        ];
    }

    onLayoutColorChange(event, color) {
        this.app.layoutColor = color;
        this.app.darkMenu = color === 'dark';

        const themeLink = document.getElementById('theme-css');
        const urlTokens = themeLink.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = 'theme-' + this.app.layoutColor + '.css';
        const newURL = urlTokens.join('/');

        this.replaceLink(themeLink, newURL);

        this.configService.updateConfig({...this.config, ...{dark:this.app.layoutColor === 'dark'}});
    }

    changeLayout(layout: string) {
        this.layout = layout;

        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const layoutHref = 'assets/layout/css/layout-' + layout + '.css';
        this.replaceLink(layoutLink, layoutHref);
    }

    changeComponentTheme(theme: string) {
        this.themeColor = theme;

        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const themeHref = 'assets/theme/' + theme + '/theme-' + this.app.layoutColor + '.css';
        this.replaceLink(themeLink, themeHref);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        }
        else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    onConfigButtonClick(event) {
        this.appMain.configActive = !this.appMain.configActive;
        event.preventDefault();
    }

    onConfigCloseClick(event) {
        this.appMain.configActive = false;
        event.preventDefault();
    }
}
