/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import QRCode from 'react-qr-code';

import './styles.scss';
import type { AddonType } from 'amo/types/addons';
import { getDownloadLink } from 'amo/components/GetFirefoxButton';
import {
  EXPERIMENT_CONFIG,
  VARIANT_SHOW,
} from 'amo/experiments/20250512_amo_android_qr_card';
import { withExperiment } from 'amo/withExperiment';
import type { RegionCodeType } from 'amo/reducers/api';
import type { AppState } from 'amo/store';
import type { I18nType } from 'amo/types/i18n';
import type { WithExperimentInjectedProps } from 'amo/withExperiment';

import KitQR from './img/kit-qr.svg';

export type Props = {|
  addon: AddonType,
  i18n: I18nType,
|};

type PropsFromState = {|
  clientApp: string,
  regionCode: RegionCodeType,
|};

type InternalProps = {|
  ...Props,
  ...PropsFromState,
  ...WithExperimentInjectedProps,
  i18n: I18nType,
|};

export class QRCardBase extends React.Component<InternalProps> {
  render(): null | React.Node {
    const { addon, i18n, variant } = this.props;

    if (variant !== VARIANT_SHOW) return null;

    const downloadLink = getDownloadLink({ addon });

    return (
      <div className="qr-card">
        <div className="qr-label">
          {i18n.gettext(
            'Scan the QR code to open this extension in Firefox for Android',
          )}
        </div>
        <div className="kit-qr-wrapper">
          <div className="kit-wrapper">
            <img className="qr-kit-svg" src={KitQR} alt="kit" />
          </div>
          <div className="qr-wrapper">
            <QRCode
              className="qr-code"
              href={downloadLink}
              value={downloadLink}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): PropsFromState => {
  return {
    clientApp: state.api.clientApp,
    regionCode: state.api.regionCode,
  };
};

const QRCard: React.ComponentType<Props> = compose(
  withRouter,
  connect(mapStateToProps),
  withExperiment({ experimentConfig: EXPERIMENT_CONFIG }),
)(QRCardBase);

export default QRCard;
