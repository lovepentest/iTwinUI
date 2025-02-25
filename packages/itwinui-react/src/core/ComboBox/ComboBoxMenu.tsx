/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Menu } from '../Menu/index.js';
import { Surface } from '../Surface/index.js';
import {
  useSafeContext,
  useMergedRefs,
  useVirtualization,
  mergeRefs,
  getWindow,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { ComboBoxStateContext, ComboBoxRefsContext } from './helpers.js';

type ComboBoxMenuProps = Omit<
  React.ComponentPropsWithoutRef<typeof Menu>,
  'onClick'
> &
  React.ComponentPropsWithoutRef<'ul'>;

const isOverflowOverlaySupported = () =>
  getWindow()?.CSS?.supports?.('overflow: overlay');

const VirtualizedComboBoxMenu = React.forwardRef(
  (
    { children, className, style, ...rest }: ComboBoxMenuProps,
    forwardedRef: React.Ref<HTMLUListElement>,
  ) => {
    const { minWidth, id, filteredOptions, getMenuItem, focusedIndex } =
      useSafeContext(ComboBoxStateContext);
    const { menuRef } = useSafeContext(ComboBoxRefsContext);

    const virtualItemRenderer = React.useCallback(
      (index: number) =>
        filteredOptions.length > 0
          ? getMenuItem(filteredOptions[index], index)
          : (children as JSX.Element), // Here is expected empty state content
      [filteredOptions, getMenuItem, children],
    );

    const focusedVisibleIndex = React.useMemo(() => {
      const currentElement = menuRef.current?.querySelector(
        `[data-iui-index="${focusedIndex}"]`,
      );
      if (!currentElement) {
        return focusedIndex;
      }

      return Number(
        currentElement.getAttribute('data-iui-filtered-index') ?? focusedIndex,
      );
    }, [focusedIndex, menuRef]);

    const { outerProps, innerProps, visibleChildren } = useVirtualization({
      // 'Fool' VirtualScroll by passing length 1
      // whenever there is no elements, to show empty state message
      itemsLength: filteredOptions.length || 1,
      itemRenderer: virtualItemRenderer,
      scrollToIndex: focusedVisibleIndex,
    });

    const surfaceStyles = {
      minInlineSize: minWidth,

      // set as constant because we don't want it shifting when items are unmounted
      maxInlineSize: minWidth,

      // max-height must be on the outermost element for virtual scroll
      maxBlockSize: 'calc((var(--iui-component-height) - 1px) * 8.5)',
      overflowY: isOverflowOverlaySupported() ? 'overlay' : 'auto',
      ...style,
    } as React.CSSProperties;

    return (
      <Surface style={surfaceStyles}>
        <div {...outerProps}>
          <Menu
            id={`${id}-list`}
            setFocus={false}
            role='listbox'
            ref={mergeRefs(menuRef, innerProps.ref, forwardedRef)}
            className={className}
            style={innerProps.style}
            {...rest}
          >
            {visibleChildren}
          </Menu>
        </div>
      </Surface>
    );
  },
);

export const ComboBoxMenu = React.forwardRef((props, forwardedRef) => {
  const { className, style, ...rest } = props;
  const { minWidth, id, enableVirtualization } =
    useSafeContext(ComboBoxStateContext);
  const { menuRef } = useSafeContext(ComboBoxRefsContext);

  const refs = useMergedRefs(menuRef, forwardedRef);

  const styles = React.useMemo(
    () => ({
      minInlineSize: minWidth,
      maxInlineSize: `min(${minWidth * 2}px, 90vw)`,
    }),
    [minWidth],
  );

  return (
    <>
      {!enableVirtualization ? (
        <Menu
          id={`${id}-list`}
          style={{ ...styles, ...style }}
          setFocus={false}
          role='listbox'
          ref={refs}
          className={cx('iui-scroll', className)}
          {...rest}
        />
      ) : (
        <VirtualizedComboBoxMenu ref={forwardedRef} {...props} />
      )}
    </>
  );
}) as PolymorphicForwardRefComponent<'ul', ComboBoxMenuProps>;
ComboBoxMenu.displayName = 'ComboBoxMenu';
