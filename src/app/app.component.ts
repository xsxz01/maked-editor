import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, NgIconsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent { }
