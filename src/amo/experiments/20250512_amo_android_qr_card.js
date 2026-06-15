/* @flow */
import { NOT_IN_EXPERIMENT } from 'amo/withExperiment';
import type { ExperimentConfig } from 'amo/withExperiment';

export const VARIANT_SHOW = 'show-qr';

export const EXPERIMENT_CONFIG: ExperimentConfig = {
  id: '20250512_amo_android_qr_card',
  variants: [
    { id: VARIANT_SHOW, percentage: 0.1 },
    { id: NOT_IN_EXPERIMENT, percentage: 0.9 },
  ],
};
