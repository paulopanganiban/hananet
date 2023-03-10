import {Component, OnInit, OnDestroy} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { ProductService } from '../service/productservice';
import { Product } from '../domain/product';
import { MenuItem } from 'primeng/api';
import {ConfigService} from '../service/app.config.service';
import {AppConfig} from '../domain/appconfig';
import {Subscription} from'rxjs';
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardDemoComponent implements OnInit, OnDestroy {

    products: Product[];

    chartData: any;

    chartOptions: any;

    chart: any;

    items: MenuItem[];

    config: AppConfig;

    subscription: Subscription;

    constructor(private productService: ProductService, public configService: ConfigService) { }

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });

        this.productService.getProducts().then(data => this.products = data);

        this.items = [
            {
                label: 'Options',
                items: [
                    {label: 'Add New', icon: 'pi pi-fw pi-plus'},
                    {label: 'Search', icon: 'pi pi-fw pi-search'}
                ]
            }];

        this.chartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'New',
                    data: [11, 17, 30, 60, 88, 92],
                    backgroundColor: 'rgba(13, 202, 240, .2)',
                    borderColor: '#0dcaf0',
                    pointBackgroundColor: '#0dcaf0',
                    pointBorderColor: '#0dcaf0',
                    pointBorderWidth: 0,
                    pointStyle: 'line',
                    fill: false,
                    tension: .4
                },
                {
                    label: 'Completed',
                    data: [11, 19, 39, 59, 69, 71],
                    backgroundColor: 'rgba(253, 126, 20, .2)',
                    borderColor: '#fd7e14',
                    pointBackgroundColor: '#fd7e14',
                    pointBorderColor: '#fd7e14',
                    pointBorderWidth: 0,
                    pointStyle: 'line',
                    fill: false,
                    tension: .4
                },
                {
                    label: 'Canceled',
                    data: [11, 17, 21, 30, 47, 83],
                    backgroundColor: 'rgba(111, 66, 193, .2)',
                    borderColor: '#6f42c1',
                    pointBackgroundColor: '#6f42c1',
                    pointBorderColor: '#6f42c1',
                    pointBorderWidth: 0,
                    pointStyle: 'line',
                    fill: true,
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    fill: true
                }
            },
            scales: {
                y: {
                    max: 100,
                    min: 0,
                    ticks: {
                        color: '#A0A7B5'
                    }
                },
                x: {
                    grid: {
                        display: true,
                    },
                    ticks: {
                        color: '#A0A7B5',
                        beginAtZero: true,
                    }
                }
            }
        };

        this.getGradient();
        this.updateChartOptions();
    }

    getGradient() {
        this.chart = document.getElementsByTagName('canvas')[0].getContext('2d');
        const gradientStroke1 = this.chart.createLinearGradient(100, 0, 500, 100);
        gradientStroke1.addColorStop(0, 'rgba(63, 213, 250, 0)');
        gradientStroke1.addColorStop(0.5, 'rgba(63, 213, 250, 1)');
        gradientStroke1.addColorStop(1, 'rgba(10, 162, 192, 1)');
        this.chartData.datasets[0].borderColor = gradientStroke1;

        const gradientStroke2 = this.chart.createLinearGradient(100, 0, 500, 100);
        gradientStroke2.addColorStop(0, 'rgba(253, 152, 67, 0)');
        gradientStroke2.addColorStop(0.5, 'rgba(253, 152, 67, 1)');
        gradientStroke2.addColorStop(1, 'rgba(202, 101, 16, 1)');
        this.chartData.datasets[1].borderColor = gradientStroke2;

        const gradientStroke3 = this.chart.createLinearGradient(100, 0, 500, 100);
        gradientStroke3.addColorStop(0, 'rgba(140, 104, 205, 0)');
        gradientStroke3.addColorStop(0.5, 'rgba(140, 104, 205, 1)');
        gradientStroke3.addColorStop(1, 'rgba(89, 53, 154, 1)');
        this.chartData.datasets[2].borderColor = gradientStroke3;

        const gradientFill = this.chart.createLinearGradient(0, 0, 500, 0);
        gradientFill.addColorStop(1, 'rgba(89, 53, 154, 0.34)');
        gradientFill.addColorStop(0, 'rgba(140, 104, 205, 0.2)');
        this.chartData.datasets[2].backgroundColor = gradientFill;
    }

    updateChartOptions() {
        if (this.config.dark)
            this.applyDarkTheme();
        else
            this.applyLightTheme();
    }

    applyLightTheme() {
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
            }
        };
    }

    applyDarkTheme() {
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

    }

    ngOnDestroy() {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }
}
