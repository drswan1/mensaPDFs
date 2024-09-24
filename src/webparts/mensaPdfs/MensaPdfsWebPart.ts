import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './MensaPdfsWebPart.module.scss';

export interface IMensaPdfsWebPartProps {
}

export default class MensaPdfsWebPart extends BaseClientSideWebPart<IMensaPdfsWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `<div class="${ styles.mensaPdfs }"></div>`;
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
