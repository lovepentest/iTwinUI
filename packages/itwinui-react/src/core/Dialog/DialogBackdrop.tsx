/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Backdrop } from '../Backdrop/index.js';
import type { BackdropProps } from '../Backdrop/Backdrop.js';
import { useMergedRefs } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { useDialogContext } from './DialogContext.js';
import type { DialogContextProps } from './DialogContext.js';
import cx from 'classnames';

type DialogBackdropProps = BackdropProps &
  Pick<
    DialogContextProps,
    'onClose' | 'isDismissible' | 'closeOnExternalClick' | 'relativeTo'
  >;

/**
 * Backdrop component for dialog. Recommended to be used with `Dialog`
 * then its visibility is being controlled by dialog's `isOpen` prop.
 * @example
 * <Dialog.Backdrop />
 */
export const DialogBackdrop = React.forwardRef((props, ref) => {
  const dialogContext = useDialogContext();
  const {
    isVisible = dialogContext.isOpen,
    isDismissible = dialogContext.isDismissible,
    onClose = dialogContext.onClose,
    closeOnExternalClick = dialogContext.closeOnExternalClick,
    relativeTo = dialogContext.relativeTo,
    onMouseDown,
    className,
    style,
    ...rest
  } = props;

  const backdropRef = React.useRef<HTMLDivElement>(null);
  const refs = useMergedRefs(backdropRef, ref);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevents React from resetting its properties
    event.persist();
    if (event.target !== backdropRef.current) {
      return;
    }
    if (isDismissible && closeOnExternalClick && onClose) {
      onClose(event);
    }
    onMouseDown?.(event);
  };

  return (
    <Backdrop
      isVisible={isVisible}
      className={cx(
        { 'iui-backdrop-fixed': relativeTo === 'viewport' },
        className,
      )}
      ref={refs}
      onMouseDown={handleMouseDown}
      style={{
        pointerEvents: 'auto',
        ...style,
      }}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', DialogBackdropProps>;

export default DialogBackdrop;
