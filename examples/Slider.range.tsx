/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider } from '@itwin/itwinui-react';

export default () => {
  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <Slider
        thumbProps={() => {
          return {
            'aria-label': `Choose a range`,
          };
        }}
        values={[25, 75]}
        min={0}
        max={100}
      />
    </div>
  );
};
