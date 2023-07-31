import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import moment from 'moment';
 
@Component({
  selector: 'line-highchart',
  templateUrl: './line-highchart.component.html'
})
export class LineHighChartComponent implements AfterViewInit {
  
  defaultCategories = [
    '20180430', 
    '20180501',
    '20180502',
    '20180503',
    '20180504',
    '20180505',
    '20180506'
  ];

  daySelected: string;

  static disabledCategories = [
    '20180504',
    '20180505',
    '20180506'
  ];

  static selectedCategory: string = '';

  chart = new Chart({
      chart: {
        type: 'line',
        animation: false,
        height: 320
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      series: [{
        data: [40, 80, 60, 50],
      }],
      xAxis: {
        categories: this.defaultCategories,
        max: 6,
        gridLineWidth: 1,
        gridLineColor: '#c5c0bc',
        gridLineDashStyle: 'dash',
        tickmarkPlacement: 'on',
        lineColor: 'transparent',
        labels: {
          style: {
            color: '#605751',
            cursor: 'pointer'
          },
          formatter () {
            const dayLetter = moment(this.value).format('dddd').charAt(0);
            const dayFormatted = moment(this.value).format('DD/MMM').toLowerCase();

            if (LineHighChartComponent.disabledCategories.indexOf(this.value) > -1) {
                return `<span style="color: #969290; font-weight: bold; cursor: not-allowed;">${dayLetter}</span>
                        <br />
                        <span style="color: #969290; cursor: not-allowed;">${dayFormatted}</span>`;
              }

            return `<b>${dayLetter}</b><br />${dayFormatted}`;
          }
        }
      },
      yAxis: {
        title: { text: '' },
        min: 0,
        max: 100,
        gridLineWidth: 0,
        labels: {
          enabled: false,
        },
        visible: false
      },
      plotOptions: {
        line: {
          color: '#ec7404',
        },
        series: {
          marker: {
            fillColor: '#fff',
            lineColor: '#ec7404',
            lineWidth: 2,
            states: {
              hover: {
                fillColor: '#ec7404',
              },
              select: {
                fillColor: '#ec7404',
                lineColor: '#ec7404',
                lineWidth: 6
              }
            },
          },
          events: {
            click: this.onClick.bind(this)
          },
          cursor: 'pointer',
          allowPointSelect: true
        }
      }
    });

    constructor(private elementRef: ElementRef) {
    }

    ngAfterViewInit() {
      this.elementRef.nativeElement.querySelector('.highcharts-xaxis-labels')
        .addEventListener('click', this.onClick.bind(this));
    }

    onClick(e) {
      console.log(e);
      if (e.point) {
        LineHighChartComponent.selectedCategory = e.point.category;
      } else {
        const categoryText = `${e.toElement.parentElement.childNodes[1].textContent}/2018`;
        const categoryFormmated = moment(categoryText).format('YYYYMMDD');

        if (LineHighChartComponent.disabledCategories.indexOf(categoryFormmated) === -1) {
          LineHighChartComponent.selectedCategory = categoryFormmated;
          for (let serie of this.chart.ref.series[0].data) {       
            if (serie.category === LineHighChartComponent.selectedCategory) {
              serie.select(true, true);
            } else {
              serie.select(false, true);
            }
          }
        }
      }

      if (LineHighChartComponent.disabledCategories.indexOf(LineHighChartComponent.selectedCategory) === -1) {
          this.daySelected = moment(LineHighChartComponent.selectedCategory).format('DD/MM/YYYY');
      }

      this.chart.ref.update({
        xAxis: {
          labels: {
            formatter () {
              const dayLetter = moment(this.value).format('dddd').charAt(0);
              const dayFormatted = moment(this.value).format('DD/MMM').toLowerCase();

              if (LineHighChartComponent.disabledCategories.indexOf(this.value) > -1) {
                return `<span style="color: #969290; font-weight: bold; cursor: not-allowed;">${dayLetter}</span>
                        <br />
                        <span style="color: #969290; cursor: not-allowed;">${dayFormatted}</span>`;
              }

              if (this.value == LineHighChartComponent.selectedCategory) {
                return `<span style="color: #ec7404; font-weight: bold;">${dayLetter}</span>
                        <br />
                        <span style="color: #ec7404; font-weight: bold;">${dayFormatted}</span>`
              }
              return `<b>${dayLetter}</b><br />${dayFormatted}`;
            },
          }
        }
      });

      this.elementRef.nativeElement.querySelector('.highcharts-xaxis-labels')
        .addEventListener('click', this.onClick.bind(this));
    }
}