/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, render, type RenderResult } from '@testing-library/react';
import * as React from 'react';
import Toast, { type ToastCategory } from './Toast.js';
import {
  SvgInfoCircular,
  SvgStatusError,
  SvgStatusSuccess,
  SvgStatusWarning,
  Icon,
} from '../utils/index.js';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from './Toaster.js';

it('renders the category classes & icons correctly', () => {
  const categories: Array<ToastCategory> = [
    'negative',
    'informational',
    'positive',
    'warning',
  ];
  categories.forEach((category) => {
    const { container } = render(
      <ToastProvider>
        <Toast
          isVisible={true}
          type='persisting'
          content='Job Processing Completed'
          category={category}
          id={1}
        />
      </ToastProvider>,
    );

    expect(container.querySelector(`.iui-toast.iui-${category}`)).toBeTruthy();

    let expectedIcon: RenderResult = {} as RenderResult;
    if (category === 'negative') {
      expectedIcon = render(
        <Icon fill={category}>
          <SvgStatusError aria-hidden />
        </Icon>,
      );
    } else if (category === 'informational') {
      expectedIcon = render(
        <Icon fill={category}>
          <SvgInfoCircular aria-hidden />
        </Icon>,
      );
    } else if (category === 'positive') {
      expectedIcon = render(
        <Icon fill={category}>
          <SvgStatusSuccess aria-hidden />
        </Icon>,
      );
    } else if (category === 'warning') {
      expectedIcon = render(
        <Icon fill={category}>
          <SvgStatusWarning aria-hidden />
        </Icon>,
      );
    }
    const icon = container.querySelector('.iui-svg-icon');
    expect(expectedIcon.container.firstChild).toEqual(icon);
  });
});

it('renders the message correctly', () => {
  const { getByText } = render(
    <ToastProvider>
      <Toast
        isVisible={true}
        type='persisting'
        content='Job Processing Completed'
        category='positive'
        id={1}
      />
    </ToastProvider>,
  );

  getByText('Job Processing Completed');
});

it('renders a report message Link correctly', async () => {
  const mockedFn = jest.fn();
  const { container } = render(
    <ToastProvider>
      <Toast
        isVisible={true}
        type='persisting'
        content='Job Processing Completed'
        category='positive'
        link={{
          title: 'View Message Function',
          onClick: mockedFn,
        }}
        id={1}
      />
    </ToastProvider>,
  );

  const link = container.querySelector('.iui-toast-anchor') as HTMLElement;
  expect(link.textContent).toBe('View Message Function');
  await userEvent.click(link);
  expect(mockedFn).toHaveBeenCalled();
});

it('renders the close icon correctly', () => {
  const { container } = render(
    <ToastProvider>
      <Toast
        isVisible={true}
        type='persisting'
        content='Job Processing Completed'
        category='positive'
        id={1}
      />
    </ToastProvider>,
  );

  expect(
    container.querySelector('.iui-button[data-iui-variant="borderless"]'),
  ).toBeTruthy();
});

it('not render close icon in temporary', () => {
  const { container } = render(
    <ToastProvider>
      <Toast
        isVisible={true}
        type='temporary'
        content='Job Processing Completed'
        category='positive'
        id={1}
      />
    </ToastProvider>,
  );

  expect(
    container.querySelector('.iui-button[data-iui-variant="borderless"]'),
  ).toBeNull();
});

it('renders the close icon when hasCloseButton', () => {
  const { container } = render(
    <ToastProvider>
      <Toast
        isVisible={true}
        hasCloseButton={true}
        type='temporary'
        content='Job Processing Completed'
        category='positive'
        id={1}
      />
    </ToastProvider>,
  );

  expect(
    container.querySelector('.iui-button[data-iui-variant="borderless"]'),
  ).toBeTruthy();
});

it('should close temporary toast after 7s', () => {
  jest.useFakeTimers();

  const mockedFn = jest.fn();
  const { container } = render(
    <ToastProvider>
      <Toast
        type='temporary'
        content='Job Processing Completed'
        category='informational'
        id={1}
        onRemove={mockedFn}
      />
    </ToastProvider>,
  );

  expect(container.querySelector('.iui-toast-all')).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(7300);
  });

  act(() => {
    jest.runAllTimers();
  });

  expect(mockedFn).toHaveBeenCalledTimes(1);
  expect(container.querySelector('.iui-toast-all')).toBeFalsy();

  jest.useRealTimers();
});

it('should pass content props correctly', () => {
  const { container } = render(
    <ToastProvider>
      <Toast
        isVisible={true}
        type='persisting'
        content='Job Processing Completed'
        category='positive'
        contentProps={{ className: 'my-class', style: { color: 'red' } }}
        id={1}
      />
    </ToastProvider>,
  );

  const toast = container.querySelector('.iui-message.my-class');
  expect(toast).toHaveStyle({ color: 'red' });
});

it('should pass status area props correctly', () => {
  const { container } = render(
    <ToastProvider>
      <Toast
        isVisible={true}
        type='persisting'
        content='Job Processing Completed'
        category='positive'
        statusAreaProps={{ className: 'my-class', style: { color: 'red' } }}
        id={1}
      />
    </ToastProvider>,
  );

  const area = container.querySelector('.iui-status-area.my-class');
  expect(area).toHaveStyle({ color: 'red' });
});
it('should render custom icon correctly', () => {
  const { container } = render(
    <ToastProvider>
      <Toast
        isVisible={true}
        type='persisting'
        content='Job Processing Completed'
        category='positive'
        startIcon={<svg className='my-icon' />}
        id={1}
      />
    </ToastProvider>,
  );

  const icon = container.querySelector('.iui-svg-icon > .my-icon');
  expect(icon).toBeTruthy();
});
