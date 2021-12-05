import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  timer = 0;
  slideShowTimer = 15;
  showBarChart = false;
  timer$: Subscription | undefined;
  source: Observable<number> = timer(0, 1000);
  timeInterval: any;
  ngOnInit(): void {
    this.createInterval();
    this.startTimer();
  }

  private createInterval() {
    this.timeInterval = setInterval(() => {
      this.showBarChart = !this.showBarChart;
    }, 15000);
  }

  private startTimer() {
    this.timer$ = this.source.subscribe((t) => {
      this.timer = this.slideShowTimer - t;
      if (this.timer === 0) {
        this.resetTimer();
        this.startTimer();
      }
    });
  }

  private resetTimer() {
    this.timer$?.unsubscribe();
  }

  ngOnDestroy() {
    this.resetTimer();
    this.timeInterval.clearInterval();
  }
}
