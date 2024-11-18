import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { AdminDashboardComponent } from "./pages/admin-pages/admin-dashboard/admin-dashboard.component";

const routes: Routes = [
	{ path: "", component: LandingPageComponent },
	{ path: "admin/dashboard", component: AdminDashboardComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ], exports: [ RouterModule ]
})
export class AppRoutingModule {
}
