import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../services/sidebar.service';
import {SettingsService} from '../services/settings.service';
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private settingService:SettingsService,private sidebarService:SidebarService ) { }

  ngOnInit(): void {
    customInitFunctions()
    this.sidebarService.cargarMenu()
  }

}
