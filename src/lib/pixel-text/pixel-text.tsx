import React from 'react'
import styled, { css } from 'styled-components'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { $primaryColor } from '../styleGuide'
import CopyImg from './copy.svg'
import CheckImg from './check.svg'
import PixelFlexBox from '../pixel-flex-box/pixel-flex-box'
export interface PixelTextProps {
  className?: string
  multiLine?: boolean
  charLimit?: number
  showToolTip?: boolean
  children?: React.ReactNode
  textSize?: string
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
  toolTipText?: string
  variant?: 'light' | 'default' | 'dark' | 'pixelPrimary'
  customColor?: string
  copyToClipboard?: boolean
}

const StyledPixelText = styled.div``
const Text = styled.div<{ color: string }> `
  font-size: ${(props: PixelTextProps) => props.textSize};
  max-width: 100%;
  width: 100%;
  color: ${(props) => props.color};
  &.multiLine {
    display: inline-block;
    white-space: pre-line !important;
    word-break: normal;
  }
  ${(props: PixelTextProps) =>
    props.variant === "light" &&
    css`
    font-size: ${(props: PixelTextProps) => props.textSize || "12px"};
     color: ${(props: PixelTextProps) => props.customColor || "#a3a3a3"};
     &.multiLine {
    display: inline-block;
    white-space: pre-line !important;
    word-break: normal;
  }
    `}
    ${(props: PixelTextProps) =>
    props.variant === "pixelPrimary" &&
    css`
    font-size: ${(props: PixelTextProps) => props.textSize || "16px"};
     color: ${(props: PixelTextProps) => props.customColor || $primaryColor};
     &.multiLine {
    display: inline-block;
    white-space: pre-line !important;
    word-break: normal;
  }
    `}
    ${(props: PixelTextProps) =>
    props.variant === "dark" &&
    css`
    font-size: ${(props: PixelTextProps) => props.textSize || "16px"};
     color:   ${(props: PixelTextProps) => props.customColor || "#000000"};
     font-weight: 700;
     &.multiLine {
    display: inline-block;
    white-space: pre-line !important;
    word-break: normal;
  }
    `}
`
export const PixelText = React.forwardRef<HTMLDivElement, PixelTextProps>(
  (
    {
      className,
      multiLine = false,
      charLimit = 500,
      showToolTip = false,
      tooltipPlacement = 'top',
      toolTipText = '',
      children = '',
      variant,
      customColor,
      copyToClipboard = false,
      ...rest
    },
    ref
  ) => {
    let characters = children ? children.toString().length : 0
    if (characters > charLimit) {
      children = children && children.toString().slice(0, charLimit) + '...'
    }
    const [copied, setCopied] = React.useState(false)
    const CopyOnclick = () => {
      navigator.clipboard.writeText(children.toString())
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }
        , 2000)

    }

    return (
      <StyledPixelText data-tag='allowRowEvents'>
        {showToolTip ? (
          <PixelFlexBox alignItems='center' gap='5px'>   <OverlayTrigger
            placement={tooltipPlacement}
            overlay={
              <Tooltip style={{ zIndex: '9999999999' }} id={`tooltip-top`}>
                {toolTipText ? toolTipText : children}
              </Tooltip>
            }
          >
            <div>
              <Text
                data-tag='allowRowEvents'
                className={multiLine ? 'multiLine' : ''}
                ref={ref}
                {...rest}
                color={customColor}
                variant={variant}
              >
                {children}
              </Text>
            </div>
          </OverlayTrigger>{copyToClipboard && <OverlayTrigger
            placement={'right'}
            overlay={
              <Tooltip style={{ zIndex: '9999999999' }} id={`tooltip-top`}>
                {copied ? 'Copied' : 'Copy to clipboard'}
              </Tooltip>
            }
          >
            <CopyImage onClick={() => CopyOnclick()} src={copied ? CheckImg : CopyImg} />
          </OverlayTrigger>}
          </PixelFlexBox>

        ) : (
          <PixelFlexBox alignItems='center' gap='5px'>
            <Text
              data-tag='allowRowEvents'
              className={multiLine ? 'multiLine' : ''}
              ref={ref}
              {...rest}
              color={customColor}
              variant={variant}
            >
              {children}
            </Text>
            {copyToClipboard && <OverlayTrigger
              placement={'right'}
              overlay={
                <Tooltip style={{ zIndex: '9999999999' }} id={`tooltip-top`}>
                  {copied ? 'Copied' : 'Copy to clipboard'}
                </Tooltip>
              }
            >
              <CopyImage onClick={() => CopyOnclick()} src={copied ? CheckImg : CopyImg} />
            </OverlayTrigger>}
          </PixelFlexBox>
        )}
      </StyledPixelText>
    )
  }
)
const CopyImage = styled.img`
  width:12px;
  height: 12px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
  `
export default PixelText
