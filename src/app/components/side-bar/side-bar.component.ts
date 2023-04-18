import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute
  ){ }
  titel = ''
  paths: any[] = [];
  ngOnInit() {
    const path = this.activatedRoute.children[0].snapshot.routeConfig?.path
    if (path === 'home') {
      this.titel = 'VM Manager'
    }
    else if (path === 'loeftis') {
      this.titel = 'Löftis'
    }
    else if (path === 'deploy') {
      this.titel = 'Deploy VM'
    }
    else if (path === 'admin') {
      this.titel = 'Admin Page'
    }
    for (let route of this.router.config) {
      if (route.children) {
        route.children.forEach(childRoute => {
          if (childRoute.path && childRoute.path !== '**')
            {
              if (childRoute.path === 'home') {
                this.paths.push({name: childRoute.path, icon: 'home', active: childRoute.path===path});
              }
              else if (childRoute.path === 'loeftis') {
                this.paths.push({name: childRoute.path, icon: 'person', active: childRoute.path===path});
              }
              else if (childRoute.path === 'deploy') {
                this.paths.push({name: childRoute.path, icon: 'cloud_upload', active: childRoute.path===path});
              }
              else if (childRoute.path === 'admin') {
                this.paths.push({name: childRoute.path, icon: 'admin_panel_settings', active: childRoute.path===path});
              }
            }
        });
      }
    }
  }
}
