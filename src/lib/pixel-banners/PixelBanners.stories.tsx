import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import PixelBanner from './pixel-banner'
import { faTractor } from '@fortawesome/free-solid-svg-icons'
import PixelFactory, { PixelFactoryContext } from '../pixel-factory/pixel-factory'

export default {
    title: 'Pixel Banner',
    component: PixelBanner,
    decorators: [
        (Story) => (
            <React.Fragment>
                <PixelFactory>
                    <Story />
                </PixelFactory>
            </React.Fragment>
        ),
    ],

} as ComponentMeta<typeof PixelBanner>

const Template: ComponentStory<typeof PixelBanner> = (args) => {
    const { showPixelBanner } = React.useContext(PixelFactoryContext)
    React.useEffect(() => {
        showPixelBanner(args)
    }, [])
    return (
        <React.Fragment>
            <PixelFactory>
                <PixelBanner {...args} />
            </PixelFactory>
        </React.Fragment>
    )
}
// set the args to the default values

export const Simple = Template.bind({})
Simple.args = {
    label: "Pixel Banner",
    dismissAfter: 5000,
    type: 'primary',
    isDismissible: false,
    icon: faTractor,
}
