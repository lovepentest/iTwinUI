/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider, Text } from '@itwin/itwinui-react';

export default () => {
  const labelId = React.useId();

  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <Text id={labelId} as='label' variant='leading'>
        Choose a range
      </Text>
      <Slider
        thumbProps={() => ({ 'aria-labelledby': labelId })}
        values={[25, 75]}
        min={0}
        max={100}
      />
    </div>
  );
};
