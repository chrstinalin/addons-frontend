/* @flow */
import * as React from 'react';
import QRCode from 'react-qr-code';

import './styles.scss';
import type { AddonType } from 'amo/types/addons';
import { getDownloadLink } from 'amo/components/GetFirefoxButton';

import KitQR from './img/kit-qr.svg';

export type Props = {|
  addon: AddonType,
|};

export default class QRCard extends React.Component<Props> {
  render(): React.Node {
    const { addon } = this.props;

    return (
      <div className="qr-card">
        <div className="qr-label">
          Scan the QR code to open this extension in Firefox for Android
        </div>
        <div className="kit-qr-wrapper">
          <div className="kit-wrapper">
            <img className="qr-kit-svg" src={KitQR} alt="kit" />
          </div>
          <div className="qr-wrapper">
            <QRCode className="qr-code" value={getDownloadLink({ addon })} />
          </div>
        </div>
      </div>
    );
  }
}
