/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';

export default () => {
  return (
    <div>
      <p style={{ marginBottom: 12 }}>Page content before alert.</p>
      <Alert.Wrapper style={{ minWidth: 'min(100%, 280px)' }}>
        <Alert.Message>This is a inline alert.</Alert.Message>
      </Alert.Wrapper>
      <p style={{ marginTop: 12 }}>Page content after alert.</p>
    </div>
  );
};
