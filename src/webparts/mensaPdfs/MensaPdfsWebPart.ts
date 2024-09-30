import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './MensaPdfsWebPart.module.scss';

export interface IMensaPdfsWebPartProps {
}

export default class MensaPdfsWebPart extends BaseClientSideWebPart<IMensaPdfsWebPartProps> {

  private getWeekNumber(): number {
    const currentDate: Date = new Date();
    const startOfYear: Date = new Date(currentDate.getFullYear(), 0, 1); // January 1st
    const daysPastSinceStartOfYear: number = (currentDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000); // Milliseconds to days
    const weekNumber: number = Math.ceil((daysPastSinceStartOfYear + startOfYear.getDay() + 1) / 7);
    return weekNumber;
  }
  
  private getCurrentYear(): number {
    const currentDate: Date = new Date();
    return currentDate.getFullYear();
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.mensaPdfs}">
        <div class="${styles.mensaPdfsContainer}">
                    <div class="${styles.mensaListContainer}">
                                  <div class="${styles.dropdown}">
                                    <div class="${styles.select}">
                                      <svg class="${styles.caret}" xmlns="http://www.w3.org/2000/svg" width="28" height="15" viewBox="0 0 34 19" fill="none">
                                        <path d="M1 2L16.6824 16L32 2" stroke="#FFFF" stroke-width="3"/>
                                      </svg>
                                      <span class="${styles.selected}">Mensa & M-Cafe NaWi</span>
                                    </div>
                                    <ul class="${styles.menu}">
                                      <li class="${styles.active}">Mensa & M-Cafe NaWi</li>
                                      <li>M-Cafe Toskanatrakt</li>
                                      <li>Techno-Z Itzling</li>
                                    </ul>
                                  </div>
                    </div>
                    <div class="${styles.mensaMenuContainer}">
                      <div class="${styles.mensaMenuButton}" data-url="https://menu.mensen.at/index/menu-pdf/locid/35?woy=${this.getWeekNumber()}&year=${this.getCurrentYear()}">
                        Speiseplan ansehen
                      </div>
                    </div>
          </div>
      </div>`;

    this.setUpDropdowns();
  }

  private setUpDropdowns(): void {
    const dropdowns = this.domElement.querySelectorAll(`.${styles.dropdown}`);

    const mensaMenuButton = this.domElement.querySelector(`.${styles.mensaMenuButton}`) as HTMLElement;
    mensaMenuButton.addEventListener('click', () => {
      const url = mensaMenuButton.getAttribute('data-url');
      if (url) {
        window.open(url, '_blank');
      }
    });

    dropdowns.forEach(dropdown => {
      const select = dropdown.querySelector(`.${styles.select}`);
      const caret = dropdown.querySelector(`.${styles.caret}`);
      const menu = dropdown.querySelector(`.${styles.menu}`);
      const options = dropdown.querySelectorAll(`.${styles.menu} li`);
      const selected = dropdown.querySelector(`.${styles.selected}`);

      select?.addEventListener('click', () => {
        select.classList.toggle(styles.selectClicked);
        caret?.classList.toggle(styles.caretRotate);
        menu?.classList.toggle(styles.menuOpen);
      });

      options.forEach((option: Element) => {
        option.addEventListener('click', () => {
          if (selected instanceof HTMLElement && option instanceof HTMLElement) {
            selected.textContent = option.textContent;
          }
          if (option.textContent === "Mensa & M-Cafe NaWi") {
            mensaMenuButton.setAttribute('data-url', `https://menu.mensen.at/index/menu-pdf/locid/35?woy=${this.getWeekNumber()}&year=${this.getCurrentYear()}`);
          } else if (option.textContent === "M-Cafe Tosknatrakt") {
            mensaMenuButton.setAttribute('data-url', `https://menu.mensen.at/index/menu-pdf/locid/36?woy=${this.getWeekNumber()}&year=${this.getCurrentYear()}`);
          } else if (option.textContent === "Techno-Z Itzling") {
            mensaMenuButton.setAttribute('data-url', `https://menu.mensen.at/index/menu-pdf/locid/100?woy=${this.getWeekNumber()}&year=${this.getCurrentYear()}`);
          }
          select?.classList.remove(styles.selectClicked);
          caret?.classList.remove(styles.caretRotate);
          menu?.classList.remove(styles.menuOpen);
          options.forEach((opt: Element) => {
            opt.classList.remove(styles.active);
          });
          option.classList.add(styles.active);
        });
      });
    });
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}