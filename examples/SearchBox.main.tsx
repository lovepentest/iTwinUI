/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex style={{ width: '70%' }}>
      <SearchBox inputProps={{ placeholder: 'SearchBox component' }} />
    </Flex>
  );
};
