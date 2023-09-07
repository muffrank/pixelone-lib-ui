import React, { useEffect, useRef, useState } from 'react'
import DateRangePicker from './components/DateRangePicker/index'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import styled from 'styled-components'
import { Popover } from 'react-bootstrap'
import { PixelIcon } from '../../lib/pixel-button-icon/pixel-icon'
import { faArrowRight, faCalendar } from '@fortawesome/free-solid-svg-icons'
import PixelFlexBox from '../pixel-flex-box/pixel-flex-box'

export interface PixelDateRangePickerProps {
  onChange?: (Array) => void
  handelApply?: () => void
  ranges?: any
  month?: number
  className?: string
}

import PixelDate from '../pixel-date/pixel-date'
import PixelButton from '../pixel-button/pixel-button'

const PixelDateRangePicker = React.forwardRef<
  HTMLDivElement,
  PixelDateRangePickerProps
>(({ onChange, ranges, month, handelApply, ...rest }, ref) => {
  const [showPopOver, setShowPopOver] = useState(false)

  const datePickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowPopOver(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  return (
    <PixelFlexBox
      style={{ position: 'relative', marginBottom: '40px' }}
      justifyContent='flex-end'
      ref={datePickerRef}
    >
      <StyledDatePicker
        onClick={() => {
          setShowPopOver(!showPopOver)
        }}
      >
        <LabelLeft>{'Start Date'}</LabelLeft>
        <Label>{'End Date'}</Label>
        <PixelIcon color='#737373' icon={faCalendar} />
        <PixelDate
          showFullDatePopover={false}
          className={'datewithtime'}
          format='pixelStandard'
          value={ranges[0].startDate || new Date()}
        />
        <PixelIcon color='#737373' icon={faArrowRight} />

        <PixelDate
          showFullDatePopover={false}
          className={'datewithtime'}
          format='pixelStandard'
          value={ranges[0].endDate || new Date()}
        />
      </StyledDatePicker>

      {showPopOver && (
        <React.Fragment>
          <StyledPopOver>
            <DateRangePicker
              onChange={onChange}
              showSelectionPreview={false}
              moveRangeOnFirstSelection={false}
              months={month}
              ranges={ranges}
              direction='horizontal'
              context={undefined}
              dateRange={undefined}
              props={undefined}
              refs={undefined} // locale={'enUS from locale'}
              focusedRange={undefined}
              RangeColors={undefined}
              style={undefined}
            />
            <PixelFlexBox padding='10px' justifyContent='flex-end' gap='10px'>
              <PixelButton
                variant='outline'
                onClick={() => setShowPopOver(!showPopOver)}
              >
                Close
              </PixelButton>
              <PixelButton onClick={ () => setShowPopOver(!showPopOver) }>Apply</PixelButton>
            </PixelFlexBox>
          </StyledPopOver>
        </React.Fragment>
      )}
    </PixelFlexBox>
  )
})

const StyledDatePicker = styled.div`
  height: 40px;
  width: 100%;
  padding: 10px 24px 10px 24px;
  cursor: pointer;
  gap: 10px;
  border: 1px solid #dee2e6 !important;
  color: '#737373';
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #f7f7f7 !important;
  position: absolute;
`
const LabelLeft = styled.div`
  position: absolute;
  left: 50px;
  top: -8px;
  z-index: 88888888;
  font-size: 11px;
  background: linear-gradient(rgb(255, 255, 255) 52%, transparent 48);
  color: rgb(115, 115, 115);
`
const Label = styled.div`
  position: absolute;
  left: 160px;
  top: -8px;
  z-index: 88888888;
  font-size: 11px;
  background: linear-gradient(rgb(255, 255, 255) 52%, transparent 48);
  color: rgb(115, 115, 115);
`

const StyledPopOver = styled(Popover)`
  max-width: 900px;
  border: none;
  box-shadow: -3px 4px 11px 2px rgba(169, 169, 169, 0.8);
  top: 50px;
  left: 1px;
  display: block;

  .popover-arrow {
    display: none;
  }
  position: absolute;
`
export default PixelDateRangePicker
