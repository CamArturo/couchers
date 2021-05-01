import { Meta, Story } from "@storybook/react";

import RatingsSlider from "./RatingsSlider";

export default {
  component: RatingsSlider,
  title: "Components/Simple/RatingsSlider",
} as Meta;

const Template: Story<any> = (args) => <RatingsSlider {...args} />;

export const ratingsSlider = Template.bind({});
