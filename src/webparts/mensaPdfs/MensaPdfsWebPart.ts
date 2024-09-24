import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './MensaPdfsWebPart.module.scss';
import { forEach } from 'lodash';

export interface IMensaPdfsWebPartProps {
}

export default class MensaPdfsWebPart extends BaseClientSideWebPart<IMensaPdfsWebPartProps> {

  
  
  public render(): void {

  function getWeekNumber(): number {
    const currentDate: Date = new Date();
    const startOfYear: Date = new Date(currentDate.getFullYear(), 0, 1); // January 1st
    const daysPastSinceStartOfYear: number = (currentDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000); // Milliseconds to days
    const weekNumber: number = Math.ceil((daysPastSinceStartOfYear + startOfYear.getDay() + 1) / 7);
    return weekNumber;
  }
  
  function getCurrentYear(): number {
    const currentDate: Date = new Date();
    return currentDate.getFullYear();
  }
  
  
    this.domElement.innerHTML = `
    <div class="${ styles.mensaPdfs}">
      <div class="${ styles.mensaPdfsContainer}">
        <div class="${ styles.mensaListContainer}">
          <div class="${ styles.dropdown}">
            <div class="${ styles.select}">
              <svg class="${ styles.caret}" sxmlns="http://www.w3.org/2000/svg" width="28" height="15" viewBox="0 0 34 19" fill="none">
                <path d="M1 2L16.6824 16L32 2" stroke="#FEFEFE" stroke-width="3"/>
              </svg>
              <span class="${ styles.selected}">Mensa & M-Cafe NaWi</span>
            </div>
          <ul class="${ styles.menu}">
            <li class="${styles.active}">Mensa & M-Cafe NaWi</li>
            <li>M-Cafe Tosknatrakt</li>
            <li>Techno-Z Itzling</li>
          </ul>
        </div>


        <div class="${ styles.mensaMenuContainer}">
          <div class="${styles.mensaMenuButton}">
          </div>
        </div>
      </div>
    </div>`;

  

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
