import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  all_players: any[] = [
    {
      name: "Al Ittihad",
      players: [
        { name: "Anas Osama", num: 10, img: "anasiiosama.jpeg" },
        { name: "Majok Deng", num: 45, img: "majokdeng.jpg" },
        { name: "Lual Lual", num: 7, img: "luallualacuil.jpg" },
        { name: "Ahmed Aly", num: 88, img: "ahmedaly.jpg" },
        { name: "Angok Deng", num: 83, img: "angokdeng.jpg" },
        { name: "Kyle Vinales", num: 87, img: "kyle.jpg" },
        { name: "Mido Taha", num: 53, img: "mido.jpg" },
        { name: "Talaat Mahmoud", num: 86, img: "talaatmahmoud.jpg" },
        { name: "Youssef Shousha", num: 71, img: "shousha.jpg" },
        { name: "Ahmed Adel Doola", num: 64, img: "abdelhady.jpg" }
      ]
    },
    {
      name: "City Oilers",
      players: [
        { name: "Rezlife Sants", img: "rezlife.jpeg", num: 12 },
        { name: "KCCA Panther", img: "kccap.jpeg", num: 20 },
        { name: "UCA Canons", img: "duca.jpeg", num: 7 },
        { name: "Vectoria Crocs", img: "victoria.jpeg", num: 99 },
        { name: "UMA Flames", img: "duma.jpeg", num: 23 },
        { name: "JT Jaguars", img: "jt.jpeg", num: 11 },
        { name: "JKL Dolphins", img: "jkl.jpeg", num: 3 },
        { name: "KCCA Parthers", img:"kcca.jpeg", num: 4 }
      ]
    },
    {
      name: "Al Ahly",
      players: [
        { name: "Momemn Khairy", img: "momemnta.jpeg", num: 35 },
        { name: "Amr Zahran", img: "zahran.jpeg", num: 0 },
        { name: "Omar Tarek", img: "omartarek.jpeg", num: 55 },
        { name: "Rami Ibrahim", img: "rami.jpeg", num: 88 },
        { name: "Karim Sebaai", img: "karim.jpeg", num: 77 },
        { name: "Amr ElGendy", img: "amrgendy.jpeg", num: 5 },
        { name: "Zahran", img: "zahrantwo.jpeg", num: 7 },
        { name: "Ehab Amen", img: "ehabamen.jpeg", num: 4 },
        { name: "Seif Samir",img:"saifsamir.jpeg", num: 8}
      ]
    },
    {
      name: "Rivers Hoopers",
      players: [
        { name: "Will Perry", img: "will.jpeg", num: 10 },
        { name: "Abel Offia", img: "abel.jpeg", num: 3 },
        { name: "Buchi Ochie", img: "buchi.jpeg", num: 7 },
        { name: "Kelvin Amayo", img: "kelvin.jpeg", num: 77 },
        { name: "Devine Eke", img: "devine.jpeg", num: 69 },
        { name: "Micheal Daramola", img: "micheal.jpeg", num: 8 },
        { name: "Olajide Kazeem", img: "olajide.jpeg", num: 9 }
      ]
    },
    {
      name: "Zamalek",
      players: [
        { name: "Kyle Vinalees", img: "kyleza.jpeg", num: 2 },
        { name: "Walter", img: "Walter.jpeg", num: 22 },
        { name: "Edgar", img: "edgar.jpeg", num: 17 },
        { name: "Ahmed Hatem", img: "ahmedhatem.jpeg", num: 6 },
        { name: "Moody Yasser", img: "moody.jpeg", num: 9 },
        { name: "Omar Hisham", img: "omarhisham.jpeg", num: 88 },
        { name: "Anas Osama", img: "anasosama.jpeg", num: 10 },
        { name: "IKE", img: "Ike.jpeg", num: "00" },
        { name: "Mostafa Kijo", img: "kijoo.jpeg", num: 14 },
        { name: "Mohab Yasser", img: "mohab.jpeg", num: 0 }
      ]
    }
  ];

  matches: any[] = [
    { name: "Al Ahly VS City Oilers", banner: "ahlyciityban.avif", team1: "Al Ahly", team2: "City Oilers" },
    { name: "Al Ittihad VS Rivers Hoopers", banner: "aiavsrh.jpg", team1: "Al Ittihad", team2: "Rivers Hoopers" },
    { name: "Zamalek VS CTT", banner: "zamalekctt.jpg", team1: "Zamalek", team2: "CTT" }
  ];

  searchOptions: string[] = [
    "Al Ahly VS City Oilers",
    "Al Ittihad VS Rivers Hoopers",
    "Zamalek VS CTT"
  ];

  news: any[] = [];

  matchVideos: { [key: string]: string } = {
    "Al Ahly VS City Oilers": "https://www.youtube.com/embed/fA_fWp_2yUI",
    "Al Ittihad VS Rivers Hoopers": "https://www.youtube.com/embed/PjVpXqG_4O4",
    "Zamalek VS CTT": "https://www.youtube.com/embed/8vR9_GscZ54"
  };

  visualsData: any = {
    "Al Ahly VS City Oilers": {
      csv: ["Al Ahly and City Oilers_1.csv", "Al Ahly and City Oilers_2.csv"],
      heatmap: ["ahlyheat.png", "cityheat.png"],
      network: ["ahlynet.png", "citynet.png"],
      threeD: ["visuals/3d_Al Ahly_VS_City Oilers_home.png", "visuals/3d_Al Ahly_VS_City Oilers_away.png"]
    },
    "Al Ittihad VS Rivers Hoopers": {
      csv: ["Al Ittihad and Rivers Hoopers_1.csv", "Al Ittihad and Rivers Hoopers_2.csv"],
      heatmap: ["ittihadheat.png", "riversheat.png"],
      network: ["ittihadnet.png", "riversnet.png"],
      threeD: ["visuals/3d_Al Ittihad_VS_Rivers Hoopers_home.png", "visuals/3d_Al Ittihad_VS_Rivers Hoopers_away.png"]
    },
    "Zamalek VS CTT": {
      csv: ["Zamlek and CTT_1.csv", "Zamlek and CTT_2.csv"],
      heatmap: ["zamalekheat.png", "cttheat.png"],
      network: ["zamaleknet.png", "cttnet.png"],
      threeD: ["visuals/3d_Zamalek_VS_CTT_home.png", "visuals/3d_Zamalek_VS_CTT_away.png"]
    }
  };

  currentIndex = 0;
  currentMatch: any;
  searchText = '';
  filteredOptions: string[] = [];
  timer: any;

  viewMode: 'story' | 'dashboard' | 'videos' = 'story';
  selectedMatch: string = '';
  showStats = false;
  selectedStatTab: 'csv' | 'heatmap' | 'network' | 'threeD' = 'csv';
  isSidebarVisible: boolean = true;
  isLightMode: boolean = false;
  team1Name: string = 'Team 1';
  team2Name: string = 'Team 2';

  viewingTeamIndex = 0;
  viewingTeam: any = null;
  dashboardTimer: any;

  csvData1: any[] = [];
  csvHeaders1: string[] = [];
  csvData2: any[] = [];
  csvHeaders2: string[] = [];

  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadMatchesFromApi();
    this.loadNewsFromApi();
  }

  loadMatchesFromApi() {
    fetch('https://basketball-analytics-dashboard-v2-s.vercel.app/api/matches')
      .then(res => res.json())
      .then((data: any[]) => {
        if (data && data.length > 0) {
          this.matches = data;
          this.searchOptions = data.map(m => m.title || m.name);
          
          data.forEach(m => {
            const title = m.title || m.name;
            if (!this.visualsData[title]) {
              const teams = title.split(' VS ');
              if (teams.length === 2) {
                const t1 = teams[0].trim();
                const t2 = teams[1].trim();
                this.visualsData[title] = {
                  csv: [`${t1} and ${t2}_1.csv`, `${t1} and ${t2}_2.csv`],
                  heatmap: [`${t1.toLowerCase().split(' ')[0]}heat.png`, `${t2.toLowerCase().split(' ')[0]}heat.png`],
                  network: [`${t1.toLowerCase().split(' ')[0]}net.png`, `${t2.toLowerCase().split(' ')[0]}net.png`],
                  threeD: [`visuals/3d_${t1}_VS_${t2}_home.png`, `visuals/3d_${t1}_VS_${t2}_away.png`]
                };
              }
            }
          });
        }
        this.currentMatch = this.matches[0];
        this.startStory();
        this.cdr.detectChanges();
      })
      .catch(err => {
        console.log('⚠️ Running with static data fallback', err);
        this.currentMatch = this.matches[0];
        this.startStory();
      });
  }

  loadNewsFromApi() {
    fetch('https://basketball-analytics-dashboard-v2-s.vercel.app/api/news')
      .then(res => res.json())
      .then((data: any[]) => {
        if (data && data.length > 0) {
          this.news = data.reverse();
          this.cdr.detectChanges();
        }
      })
      .catch(err => console.log('⚠️ Could not load live news', err));
  }

  getSafeVideoUrl(): SafeResourceUrl {
    const url = this.matchVideos[this.selectedMatch] || '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
  }

  startStory() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.matches.length;
      this.currentMatch = this.matches[this.currentIndex];
      this.cdr.detectChanges();
    }, 3000);
  }

  openMatchFromBanner(match: any) {
    this.selectOption(match.title || match.name);
  }

  startDashboardStory() {
    if (this.dashboardTimer) clearInterval(this.dashboardTimer);
    this.viewingTeamIndex = 0;
    this.setViewingTeam();
    this.dashboardTimer = setInterval(() => {
      this.viewingTeamIndex = this.viewingTeamIndex === 0 ? 1 : 0;
      this.setViewingTeam();
      this.cdr.detectChanges();
    }, 8000);
  }

  setViewingTeam() {
    const teamName = this.viewingTeamIndex === 0 ? this.team1Name : this.team2Name;
    this.viewingTeam = this.all_players.find(t => t.name === teamName) || null;
  }

  stopDashboardStory() {
    if (this.dashboardTimer) clearInterval(this.dashboardTimer);
  }

  onSearch() {
    if (!this.searchText) {
      this.filteredOptions = [...this.searchOptions];
    } else {
      this.filteredOptions = this.searchOptions.filter(opt =>
        opt.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  selectOption(opt: string) {
    this.searchText = opt;
    this.selectedMatch = opt;

    const teams = opt.split(' VS ');
    if (teams.length === 2) {
      this.team1Name = teams[0].trim();
      this.team2Name = teams[1].trim();
    }

    this.filteredOptions = [];
    this.viewMode = 'dashboard';

    if (this.timer) clearInterval(this.timer);
    this.startDashboardStory();
  }

  loadCSVData() {
    const matchFiles = this.visualsData[this.selectedMatch]?.csv;
    if (matchFiles && matchFiles.length >= 2) {
      this.fetchSingleCSV(`/${matchFiles[0]}`, 1);
      this.fetchSingleCSV(`/${matchFiles[1]}`, 2);
    }
  }

  fetchSingleCSV(path: string, tableIndex: number) {
    fetch(path)
      .then(res => {
        if (!res.ok) throw new Error('CSV File not found');
        return res.text();
      })
      .then(data => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            if (tableIndex === 1) {
              this.csvData1 = result.data;
              this.csvHeaders1 = this.csvData1.length > 0 ? Object.keys(this.csvData1[0]) : [];
            } else {
              this.csvData2 = result.data;
              this.csvHeaders2 = this.csvData2.length > 0 ? Object.keys(this.csvData2[0]) : [];
            }
            this.cdr.detectChanges();
          }
        });
      })
      .catch(err => console.error(`Error loading CSV ${tableIndex}:`, err));
  }

  setTab(tab: 'csv' | 'heatmap' | 'network' | 'threeD') {
    this.selectedStatTab = tab;
    if (tab === 'csv') {
      this.loadCSVData();
    }
  }

  openStats() {
    this.showStats = true;
    this.setTab('csv');
  }

  closeStats() {
    this.showStats = false;
  }

  goBack() {
    this.viewMode = 'story';
    this.showStats = false;
    this.searchText = '';
    this.stopDashboardStory();
    this.startStory();
  }
}