import React, { Fragment } from 'react';
import { Story, Meta } from '@storybook/react';

import { Image, Spacer } from '@raidguild/design-system';
import { Header, HeaderProps, AccountButton } from 'components';
import logo from 'assets/wrapeth_logo.png';

export default {
  title: 'Components/Atoms/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const WithButton = Template.bind({});
WithButton.args = {
  children: <AccountButton />,
};

export const WithButtonAndLogo = Template.bind({});
WithButtonAndLogo.args = {
  children: (
    <Fragment>
      <Image src={logo} alt='wrapeth logo' max-width='240px' height='auto' />
      <Spacer />
      <AccountButton />
    </Fragment>
  ),
};
