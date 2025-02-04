import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './MensaPdfsWebPart.module.scss';

export interface IMensaPdfsWebPartProps {
}

export default class MensaPdfsWebPart extends BaseClientSideWebPart<IMensaPdfsWebPartProps> {

  // private getWeekNumber(): number {
  //   const currentDate: Date = new Date();
  //   const startOfYear: Date = new Date(currentDate.getFullYear(), 0, 1); // January 1st
  //   const daysPastSinceStartOfYear: number = (currentDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000); // Milliseconds to days
  //   const weekNumber: number = Math.ceil((daysPastSinceStartOfYear + startOfYear.getDay() + 1) / 7);
  //   return weekNumber;
  // }

  // private getCurrentYear(): number {
  //   const currentDate: Date = new Date();
  //   return currentDate.getFullYear();
  // }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.mensaPdfs}">
        <div class="${styles.titleContainer}">
          <h1>Speisepläne</h1>
        </div>
        <div class="${styles.buttonContainer}">
          <button class="${styles.button}" id="Nawi">NaWi</button>
          <button class="${styles.button}" id="Toskana">Toskanatrakt</button>
          <button class="${styles.button}" id="Itzling">Techno-Z</button>
        </div>
      </div>`;

    const buttons = this.domElement.getElementsByClassName(styles.button);
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.id === 'Nawi') {
          window.open(`https://www.mensen.at/standort/mensa-m-cafe-nawi/`, '_blank');
        }
        if (target.id === 'Toskana') {
          window.open(`https://www.mensen.at/standort/m-cafe-toskana/`, '_blank');
        }
        if (target.id === 'Itzling') {
          window.open(`https://www.mensen.at/standort/m-bistro-techno-z-itzling/`, '_blank');
        }
      });
    }
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}