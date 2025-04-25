import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/editor/editor.component').then(m => m.EditorComponent)
    }
];
