import {Component} from '@angular/core';

@Component({
    templateUrl: './documentation.component.html',
    styles: [`
        :host ::ng-deep .language-css .token.string {
            background: var(--surface-overlay);
            color: var(--text-white);
        }
        :host ::ng-deep .language-css .token.operator {
            background: var(--surface-overlay);
            color: var(--text-white);
        }
    `]
})
export class DocumentationComponent {
}
